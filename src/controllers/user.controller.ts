import { getAllUserService, userLogin } from './../services/user.service'
import { NextFunction, Request, Response } from 'express'
import {
  loginUserValidation,
  userValidation
} from '../validations/user.validation'
import { UserType } from '../types/user.types'
import { ResponseTypeAuth, ResponseUserLogin } from '../types/response.types'
import { createUser } from '../services/user.service'
import { encrypt, compare } from '../utils/bcrypt'
import { ValidationError } from 'joi'
import {
  generateAccessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken
} from '../utils/jwt'

export const GetAllUserController = async (
  req: Request,
  res: Response<ResponseTypeAuth>,
  next: NextFunction
): Promise<void> => {
  try {
    const users: UserType[] = await getAllUserService()
    res.status(200).json({
      message: 'Get all users successfully',
      data: users
    })
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(
        new Error(
          'Error pada get all User : user.controller.ts - ' + error.message
        )
      )
    } else {
      next(new Error('Unknown error occurred'))
    }
  }
}

export const RegisterUserController = async (
  req: Request,
  res: Response<ResponseTypeAuth>,
  next: NextFunction
): Promise<void> => {
  const payload: UserType = req.body

  const { error, value } = userValidation(payload)
  if (error) {
    res.status(400).json({
      error: error.details[0].message,
      message: 'Create user gagal',
      data: value
    })
    return
  }
  try {
    value.password = encrypt(value.password)
    delete value.confirmPassword
    const dataUser = await createUser(value)
    res.status(201).json({
      message: 'Create User Successfully',
      data: dataUser
    })
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(
        new Error(
          'Error pada create User : user.controller.ts - ' + error.message
        )
      )
    } else {
      next(new Error('Unknown error occurred'))
    }
  }
}

export const loginUserController = async (
  req: Request<UserType>,
  res: Response<ResponseUserLogin>,
  next: NextFunction
): Promise<void> => {
  const payload: UserType = req.body
  const {
    error,
    value
  }: { error: ValidationError | undefined; value: UserType } =
    loginUserValidation(payload)
  if (error) {
    res.status(404).json({
      message: 'Error validation : ' + error.message,
      error: error.message,
      data: value
    })
    return
  }
  try {
    const user = await userLogin(value)
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'Login gagal'
      })
      return
    }
    if (!compare(value.password, user.password)) {
      res.status(400).json({
        error: 'Password salah',
        message: 'Login Gagal'
      })
      return
    }
    const loginUser = {
      user_id: user.user_id,
      nama: user.nama,
      email: user.email,
      role: user.role
    }
    const accessToken = generateAccessToken(loginUser)
    const refreshToken = generateRefreshToken(loginUser)
    res.status(200).json({
      message: 'Login Sukses',
      error: null,
      data: loginUser,
      accessToken,
      refreshToken
    })
    return
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    next(
      new Error(
        `Error pada login user controller : user.controller.ts - ${errorMessage}`
      )
    )
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Verifikasi token gagal',
        data: null
      })
      return
    }

    const verify = verifyRefreshToken(token)
    if (!verify) {
      res.status(401).json({
        error: 'Token tidak valid',
        message: 'Verifikasi token gagal',
        data: null
      })
      return
    }

    const data = parseJWT(token)
    const user = await userLogin(data)
    if (!user) {
      res.status(404).json({
        error: 'Token tidak valid',
        message: 'Refresh token gagal ',
        data: null
      })
      return
    }
    user.password = 'xxxxxxx'
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    res.status(200).json({
      error: null,
      message: 'Login sukses',
      data: {
        user,
        accessToken,
        refreshToken
      }
    })
    return
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    next(
      new Error(
        `Error pada Refresh Token : user.controller.ts - ${errorMessage}`
      )
    )
  }
}
