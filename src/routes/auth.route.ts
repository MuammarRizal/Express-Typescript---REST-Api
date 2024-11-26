import { Router } from 'express'
import {
  GetAllUserController,
  loginUserController,
  RegisterUserController
} from '../controllers/user.controller'

const AuthRouter: Router = Router()

AuthRouter.post('/user/register', RegisterUserController)
AuthRouter.get('/user/login', loginUserController)
AuthRouter.get('/user', GetAllUserController)

export default AuthRouter
