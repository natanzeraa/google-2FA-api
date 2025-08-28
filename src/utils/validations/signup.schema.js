import { z } from 'zod'
import * as authMsg from '../../utils/messages/auth.messages.js'
import {
  isValidCNPJ,
  isValidEmail
} from '../../utils/validations/auth.validator.js'

export const signupSchema = z.object({
  companyName: z
    .string()
    .min(3, authMsg.errorMessages.COMPANY_NAME_INVALID)
    .nonempty(authMsg.errorMessages.COMPANY_NAME_REQUIRED),

  email: z
    .string()
    .nonempty(authMsg.errorMessages.EMAIL_REQUIRED)
    .refine(isValidEmail, { message: authMsg.errorMessages.EMAIL_INVALID }),

  cnpj: z
    .string()
    .nonempty(authMsg.errorMessages.CNPJ_REQUIRED)
    .refine(isValidCNPJ, { message: authMsg.errorMessages.CNPJ_INVALID }),

  phone: z
    .string()
    .nonempty(authMsg.errorMessages.PHONE_REQUIRED)
    .regex(/^\+?[\d\s\-()]{7,15}$/, authMsg.errorMessages.PHONE_INVALID),

  password: z
    .string()
    .nonempty(authMsg.errorMessages.PASSWORD_REQUIRED)
    .min(6, authMsg.errorMessages.PASSWORD_TOO_SHORT),

  twoFaEnabled: z
    .boolean()
})
