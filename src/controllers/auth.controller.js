import * as authService from '../services/auth.service.js'
import { handleResponse } from '../utils/handlers/response.handler.js'

const login = (req, res) => handleResponse(res, authService.login(req.body))
const signup = (req, res) => handleResponse(res, authService.signup(req.body))

export { login, signup }

