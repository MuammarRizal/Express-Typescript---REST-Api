import { UserType } from '../types/user.types'
import prisma from '../utils/client'

export const createUser = async (payload: UserType): Promise<UserType> => {
  const data = await prisma.user.create({
    data: {
      ...payload
    }
  })
  return data
}

export const getAllUserService = async (): Promise<UserType[]> => {
  const data = await prisma.user.findMany()
  return data
}

export const userLogin = async (payload: UserType) => {
  const data = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  })

  return data
}
