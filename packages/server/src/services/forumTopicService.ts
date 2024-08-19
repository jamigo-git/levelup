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

class ForumTopicService {
  public createTopic = async ({ title, userId, message }: CreateTopicRequest) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const topic = await ForumTopic.create({ title, userId })

    if (message) {
      await ForumComment.create({
        userId,
        text: message,
        topicId: topic.id,
      })
    }

    return topic
  }

  public getTopicById = async (id: number) => {
    const topic = await ForumTopic.findByPk(id, {
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
      include: {
        model: User,
      },
    })

    if (!topic) {
      throw new NotFoundError('Topic not found')
    }

    return topic
  }

  public getTopicList = async ({ limit, offset }: GetListRequest) => {
    const total = await ForumTopic.count()
    const list = await ForumTopic.findAll({
      limit,
      offset,
      order: [['createdAt', 'ASC']],
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
        },
      ],
      group: ['ForumTopic.id', 'user.id'],
    })

    return { total, list }
  }
}

export default new ForumTopicService()
