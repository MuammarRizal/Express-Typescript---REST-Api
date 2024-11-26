import Joi from 'joi'
import { UserType } from '../types/user.types'

export const userValidation = (
  payload: UserType
): Joi.ValidationResult<UserType> => {
  const schema = Joi.object({
    user_id: Joi.string().trim().allow(null, ''),
    email: Joi.string().trim().required().email().messages({
      'string.base': 'Email harus berupa string',
      'string.empty': 'Email tidak boleh kosong',
      'string.email': 'Email tidak valid',
      'any.required': 'Email harus diisi'
    }),
    nama: Joi.string().trim().required().messages({
      'string.base': 'Name harus berupa string',
      'string.empty': 'Name tidak boleh kosong',
      'any.required': 'Name harus diisi'
    }),
    password: Joi.string().min(3).max(15).required().messages({
      'string.base': 'Password harus berupa string',
      'string.empty': 'Password tidak boleh kosong',
      'string.min': 'Password minimal 3 characters',
      'string.max': 'Password maximal 15 characters',
      'any.required': 'Password harus diisi'
    }),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({
        'any.only': 'Confirm password dan password harus sama',
        'any.required': 'Password dan Confirm Password harus diisi'
      }),
    role: Joi.string().trim().allow(null, '')
  })

  return schema.validate(payload)
}

export const loginUserValidation = (
  payload: UserType
): Joi.ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().trim().required().email().messages({
      'string.base': 'Email harus berupa string',
      'string.empty': 'Email tidak boleh kosong',
      'string.email': 'Email tidak valid',
      'any.required': 'Email harus diisi'
    }),
    password: Joi.string().required().messages({
      'string.base': 'Password harus berupa string',
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password harus diisi'
    })
  })

  return schema.validate(payload)
}
