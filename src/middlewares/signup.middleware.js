import { errorMessages } from '../utils/messages/auth.messages.js'
import { isValidCNPJ, isValidEmail } from '../utils/validations/auth.validator.js'

const validateSignup = (req, res, next) => {
  const { companyName, email, cnpj, phone, password, users } = req.body

  const requiredFields = { companyName, email, cnpj, phone, password }

  // Verificar campos ausentes
  const missingFields = Object.entries(requiredFields).filter(
    ([_, value]) => !value
  )

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: errorMessages.ERROR_MANDATORY_FIELDS,
      missing: missingFields.map(([key]) => key)
    })
  }

  // Nome da empresa
  if (companyName.trim().length < 3) {
    return res.status(400).json({ message: errorMessages.COMPANY_NAME_INVALID })
  }

  // CNPJ
  if (!isValidCNPJ(cnpj)) {
    return res.status(400).json({ message: errorMessages.CNPJ_INVALID })
  }

  // E-mail
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: errorMessages.EMAIL_INVALID })
  }

  // Telefone
  const phoneRegex = /^\+?[\d\s\-()]{7,15}$/
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: errorMessages.PHONE_INVALID })
  }

  // Senha
  if (password.length < 6) {
    return res.status(400).json({ message: errorMessages.PASSWORD_TOO_SHORT })
  }

  // Usuários
  // if (!Array.isArray(users) || users.length === 0) {
  //   return res.status(400).json({ message: errorMessages.USERS_REQUIRED })
  // }

  next()
}

export default validateSignup
