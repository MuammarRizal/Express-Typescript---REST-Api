import { Router } from 'express'
import {
  deleteBarangController,
  getAllBarang,
  getBarangById,
  insertBarang,
  updateBarangController
} from '../controllers/barang.controller'
import { autenticate } from '../controllers/errorHandler.controller'

const BarangRouter: Router = Router()

BarangRouter.get('/barang', autenticate, getAllBarang)

BarangRouter.post('/barang', autenticate, insertBarang)

BarangRouter.get('/barang/:id', autenticate, getBarangById)

BarangRouter.put('/barang/:id', autenticate, updateBarangController)

BarangRouter.delete('/barang/:id', autenticate, deleteBarangController)
export default BarangRouter
