import { UserType } from './user.types'
import { BarangTypeDB } from './barang.types'

export interface ResponseData {
  message: string
  data: BarangTypeDB[]
}

export interface ResponseDetailBarang {
  message: string
  data: BarangTypeDB | null
}

export interface ResponseErrorHandler {
  message: string
  error: string
  data: null
}

export interface ResponseTypeAuth {
  message: string
  data?: UserType[] | UserType
  error?: string | null
}

export interface ResponseUserLogin {
  message: string
  data?: {
    user_id: number | string
    nama: string
    email: string
    role: string
  }
  error?: string | null
  accessToken?: string
  refreshToken?: string
}

export interface userResponse {
  user_id: string | number
  nama: string
  email: string
  role: string
}
