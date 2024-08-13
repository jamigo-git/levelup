import { Op } from 'sequelize'
import { User } from '../models/userModel'
import { ForumTopic } from '../models/forumTopicModel'
import { ForumComment } from '../models/forumCommentModel'
import NotFoundError from '../errors/NotFoundError'

interface GetListRequest {
  topicId: number
  limit: number
  offset: number
}

interface CreateCommentRequest {
  topicId: number
  userId: number
  text: string
  parentId?: number
}

class ForumCommentService {
  public createComment = async ({ topicId, userId, text, parentId }: CreateCommentRequest) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const topic = await ForumTopic.findByPk(topicId)
    if (!topic) {
      throw new NotFoundError('Topic not found')
    }

    let parentComment: ForumComment | null = null
    if (parentId !== undefined) {
      parentComment = await ForumComment.findByPk(parentId)
      if (!parentComment) {
        throw new NotFoundError('Parent comment not found')
      }
    }

    const comment = await ForumComment.create({
      text,
      userId,
      topicId,
      parentId,
    })

    if (parentComment) {
      parentComment.replies = [...(parentComment.replies || []), comment]
      await parentComment.save()
    }

    return comment
  }

  public getCommentList = async ({ limit, offset, topicId }: GetListRequest) => {
    return await ForumComment.findAll({
      limit,
      offset,
      where: [{ topicId }, { parentId: { [Op.is]: null } }],
      include: [
        {
          model: ForumComment,
          as: 'replies',
          include: [
            {
              model: ForumComment,
              as: 'replies',
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'first_name', 'second_name', 'display_name'],
        },
      ],
    })
  }
}

export default new ForumCommentService()
