import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const customerSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  cpfCnpj: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Customer', customerSchema)
