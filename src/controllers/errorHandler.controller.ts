import { Request, Response } from 'express'
import { ResponseErrorHandler } from '../types/response.types'
import { logger } from '../utils/winston'

export const errorHandlerController = (
  err: Error,
  req: Request,
  res: Response<ResponseErrorHandler>
): void => {
  const message = err.message.split(' - ')[1]
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'Server internal error',
    data: null
  })
  return
}

export const errorNotFoundController = (
  err: Error,
  req: Request,
  res: Response<ResponseErrorHandler>
): void => {
  logger.error(err)
  res.status(400).json({
    error: 'Not Found',
    message: 'Halaman tidak ditemukan',
    data: null
  })
  return
}
