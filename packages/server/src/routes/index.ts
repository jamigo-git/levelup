import { Router } from 'express'
import { userRoutes } from './user'
import { forumRoutes } from './forum'

const router: Router = Router()

forumRoutes(router)
userRoutes(router)

export default router
