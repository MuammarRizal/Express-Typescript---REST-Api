import joi from 'joi'
import BarangType from '../types/barang.types'

export const inputBarangValidation = (
  payload: BarangType
): joi.ValidationResult => {
  const schema = joi.object({
    nama: joi.string().trim().required().messages({
      'string.base': 'Barang harus berupa string',
      'string.empty': 'Barang tidak boleh kosong',
      'any.required': 'Barang harus diisi'
    }),
    jumlah: joi.number().required().messages({
      'number.base': 'Jumlah harus berupa angka',
      'number.empty': 'Jumlah tidak boleh kosong',
      'any.required': 'Jumlah harus diisi'
    }),
    harga: joi.number().required().messages({
      'number.base': 'Harga harus berupa angka',
      'number.empty': 'Harga tidak boleh kosong',
      'any.required': 'Harga harus diisi'
    })
  })

  return schema.validate(payload)
}
