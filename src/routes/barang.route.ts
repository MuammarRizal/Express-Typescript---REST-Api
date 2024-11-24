import { NextFunction, Request, type Response, Router } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import BarangType from '../types/barang.types'

const BarangRouter: Router = Router()

BarangRouter.get(
  '/barang',
  (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello world')
  }
)

BarangRouter.post('/barang', (req: Request, res: any) => {
  const payload: BarangType = req.body
  const { error, value } = inputBarangValidation(payload)
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
      message: 'Input data gagal',
      data: value
    })
  }
  res.status(200).json({
    error: null,
    message: 'Input data sukses',
    data: value
  })
})
export default BarangRouter
