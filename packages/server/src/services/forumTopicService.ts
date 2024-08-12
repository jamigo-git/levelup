import { Sequelize } from 'sequelize'
import { User } from '../models/userModel'
import { ForumTopic } from '../models/forumTopicModel'
import { ForumComment } from '../models/forumCommentModel'
import NotFoundError from '../errors/NotFoundError'

interface GetListRequest {
  limit: number
  offset: number
}

interface CreateTopicRequest {
  title: string
  userId: number
  message?: string
}

interface CreateCommentRequest {
  topicId: number
  userId: number
  text: string
  parentId?: number
}

class ForumTopicService {
  public createTopic = async ({ title, userId, message }: CreateTopicRequest) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const topic = await ForumTopic.create({ title, userId: userId })

    if (message) {
      await ForumComment.create({
        userId,
        text: message,
        topicId: topic.id,
      })
    }

    return topic
  }

  public getTopicList = async ({ limit, offset }: GetListRequest) => {
    return await ForumTopic.findAll({
      limit,
      offset,
      attributes: {
        exclude: ['userId'],
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM forum_comments AS comments
              WHERE comments."topicId" = "ForumTopic"."id"
            )`),
            'commentCount',
          ],
        ],
      },
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'second_name', 'display_name'],
        },
      ],
      group: ['ForumTopic.id', 'user.id'],
    })
  }

  public createComment = async ({ topicId, userId, text }: CreateCommentRequest) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const topic = await ForumTopic.findByPk(topicId)
    if (!topic) {
      throw new NotFoundError('Topic not found')
    }

    return await ForumComment.create({
      text,
      userId,
      topicId,
    })
  }

  public getCommentList = async ({ limit, offset, topicId }: GetListRequest & { topicId: number }) => {
    return await ForumComment.findAll({
      limit,
      offset,
      where: {
        topicId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'second_name', 'display_name'],
        },
      ],
    })
  }
}

export default new ForumTopicService()
