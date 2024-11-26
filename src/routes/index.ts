import { Router } from 'express'
import BarangRouter from './barang.route'
import {
  errorHandlerController,
  errorNotFoundController
} from '../controllers/errorHandler.controller'
import AuthRouter from './auth.route'

const app = Router()

// http://localhost:4000/api/
app.use('/api', BarangRouter)
app.use('/api', AuthRouter)

app.use('*', errorHandlerController)
app.use('*', errorNotFoundController)
export default app
