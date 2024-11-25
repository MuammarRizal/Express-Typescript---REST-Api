import { Decimal } from '@prisma/client/runtime/library'

export interface BarangType {
  id: string
  nama: string
  jumlah: number
  harga: number
}

export interface BarangTypeDB {
  id: number
  nama: string
  jumlah: number
  harga: Decimal
  created_at: Date
  updated_at: Date
}
