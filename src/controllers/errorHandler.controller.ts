import { NextFunction, Request, Response } from 'express'
import { ResponseErrorHandler } from '../types/response.types'
import { logger } from '../utils/winston'
import { verifyAccessToken } from '../utils/jwt'

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

export const autenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token === undefined) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Verifikasi token gagal',
      data: null
    })
    return
  }

  const user = verifyAccessToken(String(token))
  if (user === null) {
    res.status(401).json({
      error: 'Token tidak valid',
      message: 'Verifikasi gagal',
      data: null
    })
    return
  }
  next()
}
