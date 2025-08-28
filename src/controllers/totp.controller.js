import { otpAuthService } from '../services/otpauth.service.js'
import { handleResponse } from '../utils/handlers/response.handler.js'

const enableTOTPAuth = (req, res) =>
  handleResponse(
    res,
    otpAuthService.enableTOTPAuth({
      companyName: req.body.companyName,
      email: req.body.email
    })
  )

const checkTOTPAuth = (req, res) =>
  handleResponse(
    res,
    otpAuthService.checkTOTPAuth({
      token: req.body.token,
      companyName: req.body.companyName,
      email: req.body.email
    })
  )

export { checkTOTPAuth, enableTOTPAuth }

