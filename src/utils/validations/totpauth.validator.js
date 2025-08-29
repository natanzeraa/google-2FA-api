import { z } from 'zod'
import * as authMsg from '../../utils/messages/auth.messages.js'

const checkTOTPAuthSchema = z.object({
  companyName: z
    .string()
    .min(3, authMsg.errorMessages.COMPANY_NAME_INVALID)
    .nonempty(authMsg.errorMessages.COMPANY_NAME_REQUIRED),

  email: z
    .string({
      required_error: authMsg.errorMessages.EMAIL_REQUIRED
    })
    .trim()
    .nonempty(authMsg.errorMessages.EMAIL_REQUIRED)
    .email(authMsg.errorMessages.EMAIL_INVALID),

  token: z
    .string({
      required_error: authMsg.errorMessages.TOTP_INVALID
    })
    .trim()
    .length(6, authMsg.errorMessages.TOTP_INVALID)
})

const enableTOTPAuthSchema = z.object({
  companyName: z
    .string()
    .min(3, authMsg.errorMessages.COMPANY_NAME_INVALID)
    .nonempty(authMsg.errorMessages.COMPANY_NAME_REQUIRED),

  email: z
    .string({
      required_error: authMsg.errorMessages.EMAIL_REQUIRED
    })
    .trim()
    .nonempty(authMsg.errorMessages.EMAIL_REQUIRED)
    .email(authMsg.errorMessages.EMAIL_INVALID)
})

export { checkTOTPAuthSchema, enableTOTPAuthSchema }

