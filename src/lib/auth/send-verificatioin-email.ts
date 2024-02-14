import { appConfig } from '@/app-config'
import { AUTH_VERIFICATION_EMAIL_URL } from '@/routes'

import { resend } from '@/lib/resend/resend'
import { ConfirmNewAccount } from '@/components/mail-template/confirm-new-account'

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
