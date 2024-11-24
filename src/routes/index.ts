import { Router } from 'express'
import BarangRouter from './barang.route'

const app = Router()

// http://localhost:4000/api/
app.use('/api', BarangRouter)

export default app
