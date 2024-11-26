import jsonWebToken from 'jsonwebtoken'
import { userResponse } from '../types/response.types'

const generateAccessToken = (user: userResponse): string => {
  return jsonWebToken.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn:
      process.env.JWT_EXPIRES_IN != null
        ? String(process.env.JWT_EXPIRES_IN)
        : '1800s'
  })
}

const generateRefreshToken = (user: userResponse): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SECRET), {
    expiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN != null
        ? String(process.env.JWT_REFRESH_EXPIRES_IN)
        : '1800s'
  })
}

export { generateAccessToken, generateRefreshToken }
