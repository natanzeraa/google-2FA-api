import express from 'express'
import {
  create,
  destroy,
  findAll,
  findById,
  update
} from '../controllers/customer.controller.js'
import { checkToken } from '../middlewares/token.middleware.js'

const router = express.Router()

router.get('/', checkToken, findAll)
router.get('/:id', checkToken, findById)
router.post('/', checkToken, create)
router.put('/:id', checkToken, update)
router.delete('/:id', checkToken, destroy)

export default router
