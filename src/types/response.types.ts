import { BarangTypeDB } from './barang.types'

export interface ResponseData {
  message: string
  data: BarangTypeDB[]
}

export interface ResponseDetailBarang {
  message: string
  data: BarangTypeDB | null
}