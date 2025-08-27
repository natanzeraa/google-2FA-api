import { z } from 'zod'
import { errorMessages } from '../../utils/messages/auth.messages.js'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: errorMessages.EMAIL_REQUIRED
    })
    .trim()
    .nonempty(errorMessages.EMAIL_REQUIRED)
    .email(errorMessages.EMAIL_INVALID),

  password: z
    .string({
      required_error: errorMessages.PASSWORD_REQUIRED
    })
    .trim()
    .nonempty(errorMessages.PASSWORD_REQUIRED)
    .min(6, errorMessages.PASSWORD_TOO_SHORT)
})
