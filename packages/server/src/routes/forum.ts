import { Router } from 'express'
import { authCheck } from '../middlewares/authCheck'
import ForumTopicApi from '../controllers/forumTopicApi'
import ForumCommentAPI from '../controllers/forumCommentApi'

const BASE_FORUM_TOPIC_ROUTE = '/forum/topics'
const BASE_FORUM_COMMENT_ROUTE = '/forum/comments'

export const forumRoutes = (router: Router) => {
  const forumRouter = Router()
  forumRouter.post(BASE_FORUM_TOPIC_ROUTE, authCheck, ForumTopicApi.createTopic)
  forumRouter.get(`${BASE_FORUM_TOPIC_ROUTE}/:id`, ForumTopicApi.getTopic)
  forumRouter.get(BASE_FORUM_TOPIC_ROUTE, ForumTopicApi.getTopicList)

  forumRouter.post(BASE_FORUM_COMMENT_ROUTE, authCheck, ForumCommentAPI.createComment)
  forumRouter.get(BASE_FORUM_COMMENT_ROUTE, ForumCommentAPI.getCommentList)

  router.use('/', forumRouter)
}
