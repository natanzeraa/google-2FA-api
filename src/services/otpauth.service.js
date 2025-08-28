import * as OTPAuth from 'otpauth'
import * as QRCode from 'qrcode'
import Organization from '../models/organization.js'
import * as authMsg from '../utils/messages/auth.messages.js'
import * as organizationMsg from '../utils/messages/organization.messages.js'

const otpAuthService = {
  checkTOTPAuth: async ({ token, companyName, email }) => {
    try {
      const organization = await Organization.findOne({
        company_name: companyName,
        email: email
      })

      if (!organization || !organization.totp_secret) {
        return {
          success: false,
          status: 400,
          message: authMsg.errorMessages.TOTP_NOT_FOUND
        }
      }

      let totp = new OTPAuth.TOTP({
        issuer: companyName,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(organization.totp_secret)
      })

      let isValid = totp.validate({ token })

      if (!isValid) {
        return {
          success: false,
          status: 400,
          message: authMsg.errorMessages.TOTP_INVALID
        }
      }

      return {
        success: true,
        status: 200,
        tokenValid: isValid,
        message: authMsg.successMessages.SUCCESS_TOTP_VERIFIED
      }
    } catch (error) {
      throw new Error(`Erro ao verificar 2FA: ${error}`)
    }
  },
  enableTOTPAuth: async ({ companyName, email }) => {
    try {
      const organization = await Organization.findOneAndUpdate(
        { company_name: companyName, email },
        { $set: { two_fa_enabled: true } },
        { new: true, runValidators: true }
      )

      if (!organization) {
        return {
          success: false,
          status: 404,
          message: organizationMsg.errorMessages.ORGANIZATION_NOT_FOUND
        }
      }

      const data = await otpAuthService.generateTOTPAuth({
        companyName,
        email
      })

      return {
        success: true,
        status: 200,
        data,
        message: authMsg.successMessages.SUCCESS_TOTP_ENABLED
      }
    } catch (error) {
      throw new Error(`Erro ao gerar 2FA: ${error.message}`)
    }
  },
  generateTOTPAuth: async ({ companyName, email }) => {
    try {
      const organization = Organization.findOne({
        company_name: companyName,
        email: email
      })

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
        secret: new OTPAuth.Secret()
      })

      let secret = new OTPAuth.Secret({ size: 20 })
      let token = totp.generate()
      let delta = totp.validate({ token, window: 1 })
      let counter = totp.counter()
      let remaining = totp.remaining()
      let uri = totp.toString()
      let qrCodeURL = await QRCode.toDataURL(uri)

      totp = OTPAuth.URI.parse(uri)

      if (!totp) {
        return {
          success: false,
          status: 400,
          message: authMsg.errorMessages.TOTP_NOT_GENERATED
        }
      }

      await organization.updateOne({
        totp_secret: secret.base32
      })

      return {
        success: true,
        status: 200,
        qrCodeURL,
        uri,
        delta,
        counter,
        remaining,
        message: authMsg.successMessages.SUCCESS_TOTP_ENABLED
      }
    } catch (error) {
      throw new Error(`Erro ao gerar 2FA: ${error.message}`)
    }
  }
}

export { otpAuthService }

