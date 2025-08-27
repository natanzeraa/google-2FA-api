import express from 'express'
import { login, signup } from '../controllers/auth.controller.js'
import loginMiddleware from '../middlewares/login.middleware.js'
import signupMiddleware from '../middlewares/signup.middleware.js'

const router = express.Router()

router.post('/signup', signupMiddleware, signup)
router.post('/login', loginMiddleware, login)

export default router
