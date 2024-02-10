'use client'

import React from 'react'
import { DangerIcon } from '@/icons/danger-icon'
import { SuccessIcon } from '@/icons/success-icon'
import * as LabelPrimitive from '@radix-ui/react-label'
import { useFormState, useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
}

const FormContext = React.createContext<FormContextValue>(null!)

const useForm = () => {
  const formContext = React.useContext(FormContext)
  if (!formContext) {
    throw new Error('useForm should be used within <Form>')
  }
  return formContext
}

const defaultInitialState: FormStateValue = {
  status: 'idle',
}

const Form = ({
  action,
  initialData = defaultInitialState,
  children,
  className,
}: {
  action: (
    prevState: FormStateValue,
    formData: FormData,
  ) => Promise<FormStateValue>
  initialData?: FormStateValue
  children: React.ReactNode
  className?: string
}) => {
  const id = React.useId()
  const [state, formAction] = useFormState(action, initialData)

  return (
    <FormContext.Provider value={{ id, state }}>
      <form
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
      <SuccessIcon className="h-4 w-4" />
      {_message}
    </div>
  )
}

const FormError = ({ message }: { message?: string }) => {
  const { state } = useForm()
  const _message = message ?? state.message

  if (!(state.status === 'error' && _message)) return null

  return (
    <div className="flex items-center justify-center gap-x-2 rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-destructive/50 dark:text-destructive-foreground/70">
      <DangerIcon className="h-4 w-4 shrink-0" />
      <div className="break-all text-left">{_message}</div>
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

const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { pending } = useFormStatus()
    return (
      <Button
        ref={ref}
        type="submit"
        size="lg"
        className={cn(
          {
            'bg-muted text-muted-foreground': pending,
          },
          className,
        )}
        disabled={pending}
        aria-disabled={pending}
        {...props}
      >
        <TextWithPendingSpinner isPending={pending}>
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
  FormMessage,
  FormSuccess,
  FormError,
  FormSection,
  SubmitButton,
  useForm,
  useFormField,
}

export type { FormStateValue }