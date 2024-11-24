import { Request, Response, Router } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import BarangType from '../types/barang.types'

const BarangRouter: Router = Router()

BarangRouter.get('/barang', (req: Request, res: Response) => {
  res.send('Hello world')
})

BarangRouter.post('/barang', (req: Request, res: Response) => {
  const payload: BarangType = req.body
  const { error, value } = inputBarangValidation(payload)
  if (error) {
    res.status(400).json({
      error: error.details[0].message,
      message: 'Input data gagal',
      data: value
    })
    return
  }
  res.status(200).json({
    error: null,
    message: 'Input data sukses',
    data: value
  })
})
export default BarangRouter
