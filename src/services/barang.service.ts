import { BarangTypeDB } from '../types/barang.types'
import prisma from '../utils/client'

export const getBarang = async (): Promise<BarangTypeDB[]> => {
  const data = await prisma.barang.findMany()
  return data
}
