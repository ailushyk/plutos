import { appConfig } from '@/app-config'
import { AUTH_NEW_PASSWORD_URL, AUTH_VERIFICATION_EMAIL_URL } from '@/routes'

import { resend } from '@/lib/mail/resend'
import { ConfirmNewAccount } from '@/components/mail-template/confirm-new-account'
import { ResetPassword } from '@/components/mail-template/reset-password'

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}${AUTH_VERIFICATION_EMAIL_URL}?token=${token}`

  try {
    await resend.emails.send({
      from: `${appConfig.appName} <no-reply@plutos.tools>`,
      to: [email],
      subject: 'Confirm your email',
      react: ConfirmNewAccount({ link: confirmLink }),
    })
  } catch (error) {
    console.error('VERIFICATION EMAIL ERROR: ', error)
  }
}

export const sendResetPasswordEmail = async ({
  email,
  token,
}: {
  email: string
  token: string
}) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}${AUTH_NEW_PASSWORD_URL}?token=${token}`

  try {
    await resend.emails.send({
      from: `${appConfig.appName} <no-reply@plutos.tools>`,
      to: [email],
      subject: 'Reset your password',
      react: ResetPassword({ link: confirmLink }),
    })
  } catch (error) {
    console.error('RESET PASSWORD EMAIL ERROR: ', error)
  }
}
