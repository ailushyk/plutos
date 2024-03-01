'use client'

import React, { useEffect } from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { useFormState, useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DangerousIcon } from '@/components/icons/dangerous-icon'
import { SuccessIcon } from '@/components/icons/success-icon'
import { TextWithPendingSpinner } from '@/components/text-with-pending-spinner'

type FormStateValue<TData = Record<string, any>> = {
  status: 'ok' | 'error' | 'pending' | 'idle'
  data?: TData
  message?: string
  errors?: {} & Record<string, string | string[]>
}

type FormContextValue = {
  id: string
  state: FormStateValue
  form: React.ElementRef<'form'> | null
}

const FormContext = React.createContext<FormContextValue>(null!)

const useForm = () => {
  const formContext = React.useContext(FormContext)
  if (!formContext) {
    throw new Error('useForm should be used within <Form>')
  }
  const getValues = () => {
    if (!formContext.form) return {}
    return Object.fromEntries(new FormData(formContext.form!).entries())
  }
  return { ...formContext, getValues }
}

const defaultInitialState: FormStateValue = {
  status: 'idle',
}

const Form = ({
  children,
  action,
  initialData = defaultInitialState,
  className,
  onSuccess,
}: {
  children: React.ReactNode
  action: (
    prevState: FormStateValue,
    formData: FormData,
  ) => Promise<FormStateValue>
  initialData?: FormStateValue
  className?: string
  onSuccess?: () => void
}) => {
  const id = React.useId()
  const [state, formAction] = useFormState(action, initialData)
  const ref = React.useRef<React.ElementRef<'form'>>(null)

  useEffect(() => {
    /** Reset the form when the status is ok */
    if (state.status === 'ok') {
      ref.current?.reset()
      onSuccess?.()
    }
  }, [onSuccess, state.status])

  return (
    <FormContext.Provider value={{ id, state, form: ref.current }}>
      <form
        ref={ref}
        action={formAction}
        className={cn('flex flex-col gap-y-6', className)}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

type FormFieldContextValue = {
  id: string
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>(null!)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }
  return fieldContext
}

const FormField = React.forwardRef<
  HTMLFieldSetElement,
  {
    name: string
  } & React.HTMLAttributes<HTMLFieldSetElement>
>(({ name, className, children, ...props }, ref) => {
  const id = React.useId()
  return (
    <FormFieldContext.Provider value={{ id, name }}>
      <fieldset ref={ref} className={cn('space-y-0.5', className)} {...props}>
        {children}
      </fieldset>
    </FormFieldContext.Provider>
  )
})
FormField.displayName = 'FormField'

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { id } = useFormField()
  return <Label ref={ref} htmlFor={id} {...props} />
})
FormLabel.displayName = 'FormLabel'

const FormInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  const { id, name } = useFormField()
  const { state } = useForm()
  const defaultValue = state.data?.[name] || ''
  return (
    <Input
      ref={ref}
      id={id}
      name={name}
      defaultValue={defaultValue}
      {...props}
    />
  )
})
FormInput.displayName = 'FormInput'

const FormSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<'select'>
>(({ className, ...props }, ref) => {
  const { id, name } = useFormField()
  const { state } = useForm()
  const defaultValue = state.data?.[name] || ''
  return (
    <select
      ref={ref}
      id={id}
      name={name}
      defaultValue={defaultValue}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})
FormSelect.displayName = 'FormSelect'

const FormMessage = React.forwardRef<
  HTMLDivElement,
  { message?: string | string[] } & React.HTMLAttributes<HTMLDivElement>
>(({ message, className, ...props }, ref) => {
  const { state } = useForm()
  const { name } = useFormField()
  const _message = message ?? state.errors?.[name]

  if (!(state.status === 'error' && _message)) return null

  /** Show the first message in the array */
  const firstMessage = Array.isArray(_message)
    ? [..._message].shift()
    : _message
  return (
    <div
      ref={ref}
      className={cn(
        'text-sm font-medium text-red-600 dark:text-red-400/90',
        className,
      )}
      {...props}
    >
      {firstMessage}
    </div>
  )
})
FormMessage.displayName = 'FormMessage'

const FormSuccess = ({ message }: { message?: string }) => {
  const { state } = useForm()
  const _message = message ?? state.message

  if (!(state.status === 'ok' && _message)) return null

  return (
    <div className="flex items-center justify-center gap-x-1 rounded-md bg-emerald-100 p-3 text-sm text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100">
      <SuccessIcon className="h-4 w-4 shrink-0" />
      {_message}
    </div>
  )
}

const FormError = ({ message }: { message?: string | null }) => {
  const { state } = useForm()
  const _message = message ?? (state.status === 'error' && state.message)

  if (!_message) return null

  return (
    <div className="flex items-center justify-center gap-x-2 rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-destructive/50 dark:text-destructive-foreground/70">
      <DangerousIcon className="h-4 w-4 shrink-0" />
      <div className="break-words text-left">{_message}</div>
    </div>
  )
}

const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  )
})
FormSection.displayName = 'FormSection'

/**
 * Submit button with pending state
 *   If the form has more than one submit button,
 *   add a name attribute '_action' to each button to identify the action
 */
const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { pending, data } = useFormStatus()
    const action = data?.get('_action')
    let isLoading = action ? props.value === action && pending : pending
    return (
      <Button
        ref={ref}
        type="submit"
        size="lg"
        className={cn(
          {
            'bg-muted text-muted-foreground': isLoading,
          },
          className,
        )}
        disabled={pending}
        aria-disabled={pending}
        {...props}
      >
        <TextWithPendingSpinner isPending={isLoading}>
          {children}
        </TextWithPendingSpinner>
      </Button>
    )
  },
)
SubmitButton.displayName = 'SubmitButton'

export {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  FormMessage,
  FormSuccess,
  FormError,
  FormSection,
  SubmitButton,
  useForm,
  useFormField,
}

export type { FormStateValue }
