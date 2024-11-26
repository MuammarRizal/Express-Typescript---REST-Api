import { BarangTypeDB } from './../types/barang.types'
import { NextFunction, Request, Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import {
  deleteBarang,
  getBarang,
  getDetailBarang,
  insertBarangToDB,
  updatedBarang
} from '../services/barang.service'
import { ResponseData, ResponseDetailBarang } from '../types/response.types'
export const insertBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: BarangTypeDB = req.body
    const { error, value } = inputBarangValidation(payload)

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
        message: 'Input data gagal',
        data: value
      })
      return
    }

    try {
      const insertDataDB = await insertBarangToDB(payload)
      res.status(200).json({
        error: null,
        message: 'Input data sukses',
        data: insertDataDB
      })
      return
    } catch (error) {
      res.status(200).json({
        error: null,
        message: 'Input data sukses',
        data: {}
      })
    }

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

export const getBarangById = async (
  req: Request,
  res: Response<ResponseDetailBarang>,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  try {
    const data = await getDetailBarang(Number(id))
    if (!data) {
      res.status(404).json({
        message: 'Data tidak ditemukan',
        data
      })
      return
    }

    res.status(200).json({
      message: 'Data ditemukan',
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

export const deleteBarangController = async (
  req: Request,
  res: Response<ResponseDetailBarang>,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  try {
    const deletedBarang = await deleteBarang(Number(id))
    res.status(200).json({
      message: 'Delete barang successfully',
      data: deletedBarang
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

export const updateBarangController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const payload: BarangTypeDB = req.body
  const { error, value } = inputBarangValidation(payload)

  if (error) {
    res.status(400).json({
      error: error.details[0].message,
      message: 'Update data gagal',
      data: value
    })
    return
  }
  console.log(value)
  try {
    const updateBarang = await updatedBarang({
      id: Number(req.params.id),
      payload
    })
    if (!updatedBarang) {
      res.status(404).json({
        message: 'Barang Not Found',
        data: updateBarang
      })
      return
    }
    res.status(200).json({
      message: 'Updated Barang successfully',
      data: updateBarang
    })
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada update barang controller  : ' + error.message))
    } else {
      next(new Error('Unknown error occurred'))
    }
  }
}
