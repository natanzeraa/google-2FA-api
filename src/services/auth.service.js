import bcrypt from 'bcrypt'
import { default as Organization } from '../models/organization.js'
import { AuthException } from '../utils/exceptions/auth.exceptions.js'
import { requiredFieldsHandler } from '../utils/handlers/requiredFileds.handler.js'
import { generateTokens } from '../utils/handlers/token.handler.js'
import * as authMsg from '../utils/messages/auth.messages.js'
import * as organizationMsg from '../utils/messages/organization.messages.js'
import { loginSchema } from '../utils/validations/login.schema.js'
import { signupSchema } from '../utils/validations/signup.schema.js'
import { otpAuthService } from './otpauth.service.js'

export const authService = {
  login: async (data) => {
    try {
      const parsed = requiredFieldsHandler({ schema: loginSchema, data: data })

      const { email, password } = parsed.data

      const organization = await Organization.findOne({ email })
      if (!organization) {
        throw new AuthException(
          organizationMsg.errorMessages.ORGANIZATION_NOT_FOUND,
          404
        )
      }

      const passwordsMatch = bcrypt.compare(password, organization.password)
      if (!passwordsMatch) {
        throw new AuthException(authMsg.errorMessages.INVALID_CREDENTIALS, 400)
      }

      if (organization.two_fa_enabled) {
        const result = await otpAuthService.checkTOTPAuth({
          token: data.token,
          companyName: organization.company_name,
          email: organization.email
        })

        if (!result.success) {
          throw new AuthException(authMsg.errorMessages.TOTP_INVALID, 400)
        }
      }

      const { accessToken, refreshToken } = generateTokens({
        id: organization._id
      })

      return {
        success: true,
        status: 200,
        organization: {
          _id: organization._id,
          id: organization.id,
          companyName: organization.company_name,
          email: organization.email,
          cnpj: organization.cnpj,
          phone: organization.phone,
          twoFaEnabled: organization.two_fa_enabled
        },
        accessToken,
        refreshToken,
        message: authMsg.successMessages.SUCCESS_LOGING_IN
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  },

  signup: async (data) => {
    try {
      const parsed = requiredFieldsHandler({ schema: signupSchema, data: data })

      const { companyName, email, cnpj, phone, password, twoFaEnabled } =
        parsed.data

      const cnpjExists = await Organization.findOne({ cnpj })
      if (cnpjExists)
        throw new AuthException(
          organizationMsg.errorMessages.CNPJ_IN_USE_ALREADY,
          409
        )

      const emailExists = await Organization.findOne({ email })
      if (emailExists)
        throw new AuthException(authMsg.errorMessages.EMAIL_IN_USE_ALREADY)

      const phoneExists = await Organization.findOne({ phone })
      if (phoneExists)
        throw new AuthException(authMsg.errorMessages.PHONE_IN_USE_ALREADY)

      const organization = new Organization({
        company_name: companyName,
        email,
        cnpj,
        phone,
        password,
        two_fa_enabled: twoFaEnabled
      })
      await organization.save()

      const { accessToken, refreshToken } = generateTokens({
        id: organization._id
      })

      return {
        success: true,
        status: 201,
        organization: {
          _id: organization._id,
          id: organization.id,
          company_name: organization.company_name,
          email: organization.email,
          cnpj: organization.cnpj,
          phone: organization.phone
        },
        accessToken,
        refreshToken,
        message: authMsg.successMessages.SUCCESS_CREATING_ACCOUNT
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  }
}
