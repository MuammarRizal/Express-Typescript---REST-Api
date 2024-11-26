import { getAllUserService } from './../services/user.service'
import { NextFunction, Request, Response } from 'express'
import { userValidation } from '../validations/user.validation'
import { UserType } from '../types/user.types'
import { ResponseTypeAuth } from '../types/response.types'
import { createUser } from '../services/user.service'
import { encrypt } from '../utils/bcrypt'

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
