import { Op } from 'sequelize'
import { User } from '../models/userModel'
import { ForumTopic } from '../models/forumTopicModel'
import { ForumTopicReaction } from '../models/forumTopicReactionModel'
import NotFoundError from '../errors/NotFoundError'

interface GetListRequest {
  topicIds: string[]
}

export type DeleteTopicReactionsRequest = {
  id: string
}

interface AddTopicReactionsRequest {
  topicId: number
  userId: number
  emoji: string
  unified: string
}

class forumTopicReactionService {
  public createTopicReaction = async ({ topicId, userId, emoji, unified }: AddTopicReactionsRequest) => {
    const user = await User.findByPk(userId)
    const topic = await ForumTopic.findByPk(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    if (!topic) {
      throw new NotFoundError('Topic not found')
    }

    const topicReactionCreate = await ForumTopicReaction.create({ topicId, userId, emoji, unified })

    return topicReactionCreate
  }

  public deleteTopicReaction = async ({ id }: DeleteTopicReactionsRequest) => {
    const topicReactionDelete = await ForumTopicReaction.destroy({
      where: {
        id: id,
      },
    })
    return topicReactionDelete
  }

  public getTopicReactionList = async ({ topicIds }: GetListRequest) => {
    const list = await ForumTopicReaction.findAll({
      where: {
        [Op.or]: [{ topicId: { [Op.in]: topicIds } }],
      },
    })
    return { list }
  }
}

export default new forumTopicReactionService()
