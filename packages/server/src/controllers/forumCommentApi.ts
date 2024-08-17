import { z } from 'zod'
import type { NextFunction, Request, Response } from 'express'
import forumCommentService from '../services/forumCommentService'
import BadRequestError from '../errors/BadRequestError'

interface CommentListOptions {
  topicId?: string
  offset?: string
  limit?: string
}

const forumCommentSchema = z.object({
  userId: z.number(),
  text: z.string().min(1),
  topicId: z.number(),
  parentId: z.number().optional(),
})

const defaultLimit = 10
const defaultOffset = 0

class ForumCommentAPI {
  public static getCommentList = async (
    request: Request<unknown, unknown, unknown, CommentListOptions>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const topicId = request.query.topicId ? parseInt(request.query.topicId, 10) : undefined
      const limit = request.query.limit ? parseInt(request.query.limit, 10) : defaultLimit
      const offset = request.query.offset ? parseInt(request.query.offset, 10) : defaultOffset

      if (topicId === undefined) {
        throw new BadRequestError('Invalid topicId')
      }

      const data = await forumCommentService.getCommentList({ topicId, limit, offset })
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
    return undefined
  }

  public static createComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const comment = forumCommentSchema.parse(request.body)
      const result = await forumCommentService.createComment(comment)
      return response.status(201).json(result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new BadRequestError(JSON.stringify({ error: error.errors })))
      }
      next(error)
    }
    return undefined
  }
}

export default ForumCommentAPI
