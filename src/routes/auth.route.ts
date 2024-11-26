import { Router } from 'express'
import {
  GetAllUserController,
  RegisterUserController
} from '../controllers/user.controller'

const AuthRouter: Router = Router()

AuthRouter.post('/user/register', RegisterUserController)
AuthRouter.get('/user', GetAllUserController)

export default AuthRouter
