import { z } from 'zod'

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export const SighUpSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email(),
    password: z.string().min(4, {
      message: 'Password must be at least 4 characters long',
    }),
    passwordConfirmation: z.string().min(4, {
      message: 'Password must be at least 4 characters long',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })
