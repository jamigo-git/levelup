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
    const total = await ForumComment.count({
      where: { topicId, parentId: { [Op.is]: null } },
    })

    const list = await ForumComment.findAll({
      limit,
      offset,
      order: [['createdAt', 'ASC']],
      where: { topicId, parentId: { [Op.is]: null } },
      include: [
        {
          model: ForumComment,
          as: 'replies',
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: User,
        },
      ],
    })

    const fetchRepliesRecursively = async (comments: ForumComment[]) => {
      for (const comment of comments) {
        const replies = await ForumComment.findAll({
          where: { parentId: comment.id },
          include: [
            {
              model: User,
            },
          ],
          order: [['createdAt', 'ASC']],
        })

        if (replies.length > 0) {
          comment.setDataValue('replies', replies)
          await fetchRepliesRecursively(replies)
        }
      }
    }

    await fetchRepliesRecursively(list)

    return { total, list }
  }
}

export default new ForumCommentService()
