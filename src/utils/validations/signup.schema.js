import { z } from 'zod'
import { errorMessages } from '../../utils/messages/auth.messages.js'
import { isValidCNPJ, isValidEmail } from '../../utils/validations/auth.validator.js'

export const signupSchema = z.object({
  companyName: z
    .string()
    .min(3, errorMessages.COMPANY_NAME_INVALID)
    .nonempty(errorMessages.COMPANY_NAME_REQUIRED),

  email: z
    .string()
    .nonempty(errorMessages.EMAIL_REQUIRED)
    .refine(isValidEmail, { message: errorMessages.EMAIL_INVALID }),

  cnpj: z
    .string()
    .nonempty(errorMessages.CNPJ_REQUIRED)
    .refine(isValidCNPJ, { message: errorMessages.CNPJ_INVALID }),

  phone: z
    .string()
    .nonempty(errorMessages.PHONE_REQUIRED)
    .regex(/^\+?[\d\s\-()]{7,15}$/, errorMessages.PHONE_INVALID),

  password: z
    .string()
    .nonempty(errorMessages.PASSWORD_REQUIRED)
    .min(6, errorMessages.PASSWORD_TOO_SHORT)
})
