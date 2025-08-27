import express from 'express'
import {
  create,
  destroy,
  findAll,
  findById,
  update
} from '../controllers/customer.controller.js'
import validateAuthToken from '../middlewares/token.middleware.js'

const router = express.Router()

router.get('/', validateAuthToken, findAll)
router.get('/:id', validateAuthToken, findById)
router.post('/', validateAuthToken, create)
router.put('/:id', validateAuthToken, update)
router.delete('/:id', validateAuthToken, destroy)

export default router
