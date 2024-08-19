import { Router } from 'express'
import { userRoutes } from './user'
import { forumRoutes } from './forum'
import { topicReactionsRoutes } from './topicReactions'

const router: Router = Router()

forumRoutes(router)
userRoutes(router)
topicReactionsRoutes(router)

export default router
