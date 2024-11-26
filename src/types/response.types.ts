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
  data: UserType[] | UserType
  error?: string
}
