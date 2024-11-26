import { Router } from 'express'
import {
  deleteBarangController,
  getAllBarang,
  getBarangById,
  insertBarang,
  updateBarangController
} from '../controllers/barang.controller'

const BarangRouter: Router = Router()

BarangRouter.get('/barang', getAllBarang)

BarangRouter.post('/barang', insertBarang)

BarangRouter.get('/barang/:id', getBarangById)

BarangRouter.put('/barang/:id', updateBarangController)

BarangRouter.delete('/barang/:id', deleteBarangController)
export default BarangRouter
