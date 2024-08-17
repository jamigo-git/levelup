import { Router } from 'express'
import UserApi from '../controllers/userApi'

const BASE_USER_ROUTE = '/users'

export const userRoutes = (router: Router) => {
  const userRouter = Router()
  userRouter.post(BASE_USER_ROUTE, UserApi.create)

  router.use('/', userRouter)
}
