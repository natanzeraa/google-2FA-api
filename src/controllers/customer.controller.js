import * as customerService from '../services/customer.service.js'
import { handleResponse } from '../utils/handlers/response.handler.js'

const findAll = (req, res) => handleResponse(res, customerService.findAll())

const findById = (req, res) =>
  handleResponse(res, customerService.findById(req.params.id))

const create = (req, res) => {
  console.log(req.body)

  handleResponse(res, customerService.create({ body: req.body }))
}

const update = (req, res) =>
  handleResponse(
    res,
    customerService.update({ id: req.params.id, body: req.body })
  )

const destroy = (req, res) =>
  handleResponse(res, customerService.destroy(req.params.id))

export { create, destroy, findAll, findById, update }

