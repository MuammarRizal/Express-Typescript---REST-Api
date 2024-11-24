import { Router } from 'express'
import { getAllBarang, insertBarang } from '../controllers/barang.controller'

const BarangRouter: Router = Router()

BarangRouter.get('/barang', getAllBarang)

BarangRouter.post('/barang', insertBarang)

export default BarangRouter
