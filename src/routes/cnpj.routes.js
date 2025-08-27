import express from 'express'
import { cnpj } from '../controllers/cnpj.controller.js'

const router = express.Router()

router.get('/:cnpj', cnpj)

export default router