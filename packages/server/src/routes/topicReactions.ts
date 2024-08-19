import { Router } from 'express'
import { authCheck } from '../middlewares/authCheck'
import TopicReactionsApi from '../controllers/topicReactionsApi'

const BASE_TOPIC_REACTIONS_ROUTE = '/topicReactions'

export const topicReactionsRoutes = (router: Router) => {
  const topicReaction = Router()
  topicReaction.post(BASE_TOPIC_REACTIONS_ROUTE, authCheck, TopicReactionsApi.createTopicReaction)
  topicReaction.get(BASE_TOPIC_REACTIONS_ROUTE, TopicReactionsApi.getTopicReactionsList)
  topicReaction.delete(BASE_TOPIC_REACTIONS_ROUTE, TopicReactionsApi.deleteTopicReaction)

  router.use('/', topicReaction)
}
