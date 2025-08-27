import mongoose from 'mongoose'
import Customer from '../models/customers.js'
import Organization from '../models/organization.js'
import * as customerMsg from '../utils/messages/customer.messages.js'
import * as organizationMsg from '../utils/messages/organization.messages.js'

const findAll = async () => {
  try {
    const customers = await Customer.find()

    return {
      success: true,
      status: 200,
      data: customers,
      message: customerMsg.successMessages.SUCCESS_FETCHING_ALL_CUSTOMERS
    }
  } catch (error) {
    throw new Error('Não foi possível buscar clientes: ', error.message)
  }
}

const findById = async (id) => {
  try {
    const customer = await Customer.findById(id)

    if (!customer)
      return { success: false, status: 400, message: customerMsg.errorMessages.CUSTOMER_NOT_FOUND }

    return {
      success: true,
      status: 200,
      data: customer,
      message: customerMsg.successMessages.SUCCESS_FETCHING_CUSTOMER
    }
  } catch (error) {
    throw new Error('Não foi possível buscar cliente: ', error.message)
  }
}

const create = async (data) => {
  try {
    const { email, cpfCnpj, phone, organization_id } = data.body

    const customerExists = await Customer.findOne({
      $or: [
        { email },
        { cpfCnpj },
        { phone }
      ]
    })

    const organizationExists = await Organization.findById({ _id: organization_id })

    if (customerExists)
      return { success: false, status: 400, message: customerMsg.errorMessages.CUSTOMERNAME_DUPLICATED }

    if (!organizationExists)
      return { success: false, status: 400, message: organizationMsg.errorMessages.ORGANIZATION_NOT_FOUND }

    const requiredFields = { email, cpfCnpj, phone, organization_id }

    if (!Object.values(requiredFields).every(Boolean))
      return { success: false, status: 400, message: customerMsg.errorMessages.MANDATORY_FIELDS }

    const customer = await Customer.create({
      ...data.body, organization: new mongoose.Types.ObjectId(organization_id)
    })

    return {
      success: true,
      status: 201,
      data: customer,
      message: customerMsg.successMessages.SUCCESS_CREATING_CUSTOMER
    }
  } catch (error) {
    throw new Error('Não foi possível criar cliente: ', error.message)
  }
}

const update = async (data) => {
  try {
    const { id, body } = data

    const customer = await Customer.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    })

    if (!customer)
      return { success: false, status: 400, message: customerMsg.errorMessages.CUSTOMER_NOT_FOUND }

    return {
      success: true,
      status: 200,
      data: customer,
      message: customerMsg.successMessages.SUCCESS_UPDATING_CUSTOMER
    }
  } catch (error) {
    throw new Error(`Não foi possível atualizar cliente: ${error.message}`)
  }
}

const destroy = async (id) => {
  try {
    const customer = await Customer.findOneAndDelete(id)
    console.log(customer)

    if (!customer)
      return { success: false, status: 400, message: customerMsg.errorMessages.CUSTOMER_NOT_FOUND }

    return {
      success: true,
      status: 204,
      message: customerMsg.successMessages.SUCCESS_DELETING_CUSTOMER
    }
  } catch (error) {
    throw new Error('Não foi possível atualizar cliente: ', error.message)
  }
}

export { create, destroy, findAll, findById, update }

