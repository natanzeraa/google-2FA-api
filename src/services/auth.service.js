import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { default as Organization } from '../models/organization.js'
import * as authMsg from '../utils/messages/auth.messages.js'
import { loginSchema } from '../utils/validations/login.schema.js'
import { signupSchema } from '../utils/validations/signup.schema.js'

const login = async (data) => {
  try {
    const parsed = loginSchema.safeParse(data)

    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message
      }))
      return res.status(400).json({ errors })
    }

    const { email, password } = parsed.data

    const organization = await Organization.findOne({ email })
    if (!organization) throw new Error(errorMessages.ACCOUNT_NOT_FOUND)

    const passwordsMatch = bcrypt.compare(password, organization.password)
    if (!passwordsMatch) throw new Error(errorMessages.INVALID_CREDENTIALS)

    const token = jwt.sign(
      { userId: organization.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    return {
      success: true,
      status: 200,
      organization: {
        _id: organization._id,
        id: organization.id,
        companyName: organization.company_name,
        email: organization.email,
        cnpj: organization.cnpj,
        phone: organization.phone
      },
      token,
      message: authMsg.successMessages.SUCCESS_LOGING_IN
    }
  } catch (error) {
    console.log('Erro ao tentar logar: ', error.message)
    throw new Error(error.message)
  }
}

const signup = async (data) => {
  try {
    const parsed = signupSchema.safeParse(data)

    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message
      }))
      return res.status(400).json({ errors })
    }

    const { companyName, email, cnpj, phone, password } = parsed.data

    const cnpjExists = await Organization.findOne({ cnpj })
    if (cnpjExists) throw new Error(errorMessages.PHONE_IN_USE_ALREADY)

    const emailExists = await Organization.findOne({ email })
    if (emailExists) throw new Error(errorMessages.EMAIL_IN_USE_ALREADY)

    const phoneExists = await Organization.findOne({ phone })
    if (phoneExists) throw new Error(errorMessages.PHONE_IN_USE_ALREADY)

    const organization = new Organization({
      company_name: companyName,
      email,
      cnpj,
      phone,
      password
    })
    await organization.save()

    const token = jwt.sign({ id: organization.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
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
      token,
      message: authMsg.successMessages.SUCCESS_CREATING_ACCOUNT
    }
  } catch (error) {
    console.log('(auth_service.js) | Erro ao criar conta: ', error.message)
    throw new Error(error.message)
  }
}

export { login, signup }

