import * as OTPAuth from 'otpauth'
import * as QRCode from 'qrcode'
import Organization from '../models/organization.js'
import {
  AuthException,
  OrganizationNotFoundException,
  TOTPAuthInvalidException,
  TOTPSecretNotFoundException
} from '../utils/exceptions/auth.exceptions.js'
import { requiredFieldsHandler } from '../utils/handlers/requiredFileds.handler.js'
import { generateBase32Secret } from '../utils/handlers/tokenGeneration.handler.js'
import * as authMsg from '../utils/messages/auth.messages.js'
import * as organizationMsg from '../utils/messages/organization.messages.js'
import {
  checkTOTPAuthSchema,
  enableTOTPAuthSchema
} from '../utils/validations/totpauth.validator.js'

const otpAuthService = {
  checkTOTPAuth: async (data) => {
    try {
      const parsed = requiredFieldsHandler({
        schema: checkTOTPAuthSchema,
        data: data
      })

      const { token, companyName, email } = parsed.data

      const organization = await Organization.findOne({
        company_name: companyName,
        email: email
      })

      if (!organization) {
        throw new OrganizationNotFoundException(
          authMsg.errorMessages.ORGANIZATION_NOT_FOUND
        )
      }

      if (!organization.totp_secret) {
        throw new TOTPSecretNotFoundException(
          authMsg.errorMessages.TOTP_NOT_FOUND
        )
      }

      let totp = new OTPAuth.TOTP({
        issuer: companyName,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: organization.totp_secret
      })

      let isValid = totp.validate({ token })

      if (isValid === null) {
        throw new TOTPAuthInvalidException(authMsg.errorMessages.TOTP_INVALID)
      }

      return {
        success: true,
        status: 200,
        tokenValid: isValid,
        message: authMsg.successMessages.SUCCESS_TOTP_VERIFIED
      }
    } catch (error) {
      throw new AuthException(error.message)
    }
  },

  enableTOTPAuth: async (data) => {
    try {
      const parsed = requiredFieldsHandler({
        schema: enableTOTPAuthSchema,
        data: data
      })

      const { companyName, email } = parsed.data

      const organization = await Organization.findOne({
        company_name: companyName,
        email
      })

      if (!organization) {
        return {
          success: false,
          status: 404,
          message: organizationMsg.errorMessages.ORGANIZATION_NOT_FOUND
        }
      }

      const isTwoFaEnabled = await organization.updateOne(
        { $set: { two_fa_enabled: true } },
        { new: true, runValidators: true }
      )

      if (!isTwoFaEnabled) {
        return {
          success: false,
          status: 404,
          message: authMsg.errorMessages.TOTP_COULD_NOT_BE_ENABLED
        }
      }

      const totpAuth = await otpAuthService.generateTOTPAuth({
        companyName,
        email
      })

      return {
        success: true,
        status: 200,
        data: totpAuth,
        message: authMsg.successMessages.SUCCESS_TOTP_ENABLED
      }
    } catch (error) {
      throw new AuthException(error.message)
    }
  },

  generateTOTPAuth: async ({ companyName, email }) => {
    try {
      const base32Secret = generateBase32Secret()

      const organization = await Organization.findOneAndUpdate(
        { company_name: companyName, email: email },
        { totp_secret: base32Secret }
      )

      if (!organization) {
        return {
          success: false,
          status: 404,
          message: organizationMsg.errorMessages.ORGANIZATION_NOT_FOUND
        }
      }

      let totp = new OTPAuth.TOTP({
        issuer: companyName,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: base32Secret
      })

      let token = totp.generate()
      let delta = totp.validate({ token, window: 1 })
      let counter = totp.counter()
      let remaining = totp.remaining()
      let uri = totp.toString()
      let qrCode = await QRCode.toDataURL(uri)

      totp = OTPAuth.URI.parse(uri)

      if (!totp) {
        return {
          success: false,
          status: 400,
          message: authMsg.errorMessages.TOTP_NOT_GENERATED
        }
      }

      return {
        success: true,
        status: 200,
        qrCode,
        uri,
        delta,
        counter,
        remaining,
        message: authMsg.successMessages.SUCCESS_TOTP_ENABLED
      }
    } catch (error) {
      throw new AuthException(error.message)
    }
  }
}

export { otpAuthService }

