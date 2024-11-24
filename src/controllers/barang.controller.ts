import { NextFunction, Request, Response } from 'express'
import BarangType from '../types/barang.types'
import { inputBarangValidation } from '../validations/barang.validation'
export const insertBarang = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    return
  } catch (error: Error | any) {
    next(new Error('Error pada controller barang : ' + error.mesage))
  }
}

export const getAllBarang = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: BarangType[] = [
      {
        id: '1',
        nama: 'Kecap',
        harga: 2000,
        jumlah: 200
      },
      {
        id: '2',
        nama: 'Telur',
        harga: 2000,
        jumlah: 200
      }
    ]

    res.status(200).json({
      message: 'Get all barang succesfully',
      data
    })
    return
  } catch (error: Error | any) {
    next(new Error('Error in get allbarang controller : ' + error.message))
  }
}
