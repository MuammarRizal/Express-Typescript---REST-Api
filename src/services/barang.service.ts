import { BarangTypeDB } from '../types/barang.types'
import prisma from '../utils/client'

export const getBarang = async (): Promise<BarangTypeDB[]> => {
  const data = await prisma.barang.findMany()
  return data
}

export const insertBarangToDB = async (
  payload: BarangTypeDB
): Promise<BarangTypeDB> => {
  const data = await prisma.barang.create({ data: payload })
  return data
}

export const updatedBarang = async ({
  id,
  payload
}: {
  id: number
  payload: BarangTypeDB
}): Promise<BarangTypeDB> => {
  const dataUpdated = await prisma.barang.update({
    where: { id: Number(id) },
    data: payload
  })

  return dataUpdated
}

export const getDetailBarang = async (
  id: number
): Promise<BarangTypeDB | null> => {
  const data = await prisma.barang.findUnique({ where: { id } })
  return data
}

export const deleteBarang = async (id: number): Promise<BarangTypeDB> => {
  const dataDelete = await prisma.barang.delete({ where: { id } })
  return dataDelete
}
