import { Router } from 'express'
import {
  GetAllUserController,
  loginUserController,
  refreshToken,
  RegisterUserController
} from '../controllers/user.controller'

const AuthRouter: Router = Router()

AuthRouter.post('/auth/register', RegisterUserController)
AuthRouter.post('/auth/login', loginUserController)
AuthRouter.get('/auth/refresh', refreshToken)
AuthRouter.get('/user', GetAllUserController)

export default AuthRouter
