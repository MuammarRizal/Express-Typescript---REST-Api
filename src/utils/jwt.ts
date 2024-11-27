import jsonWebToken, { JwtPayload } from 'jsonwebtoken'
import { userResponse } from '../types/response.types'
import { TypeVerifyToken } from '../types/jwt.types'

const generateAccessToken = (user: userResponse): string => {
  return jsonWebToken.sign(user, String(process.env.JWT_SECRET), {
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
const verifyRefreshToken = (token: string): string | JwtPayload | null => {
  try {
    return jsonWebToken.verify(token, String(process.env.JWT_REFRESH_SECRET))
  } catch (error) {
    console.log(error)
    return null
  }
}

const verifyAccessToken = (
  token: string
): TypeVerifyToken | null | string | JwtPayload => {
  try {
    return jsonWebToken.verify(token, String(process.env.JWT_SECRET))
  } catch (error) {
    console.log(error)
    return null
  }
}

const parseJWT = (token: string): JSON => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  parseJWT
}
