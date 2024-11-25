import { NextFunction, Request, Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import { getBarang } from '../services/barang.service'
import { BarangType } from '../types/barang.types'
import { ResponseData } from '../types/response.types'
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada controller barang : ' + error.message))
    } else {
      next(new Error('Unknown error occurred'))
    }
  }
}

export const getAllBarang = async (
  req: Request,
  res: Response<ResponseData>,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await getBarang()

    res.status(200).json({
      message: 'Get all barang succesfully',
      data
    })
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada get all controller barang : ' + error.message))
    } else {
      next(new Error('Unknown error occurred'))
    }
  }
}
