import { z } from 'zod'
import type { NextFunction, Request, Response } from 'express'
import forumTopicService from '../services/forumTopicService'
import BadRequestError from '../errors/BadRequestError'

interface TopicListOptions {
  offset: string
  limit: string
}

const forumTopicSchema = z.object({
  userId: z.number(),
  title: z.string().min(1),
  message: z.string().optional(),
})

const defaultLimit = 10
const defaultOffset = 0

class ForumTopicAPI {
  public static getTopicList = async (
    request: Request<unknown, unknown, unknown, TopicListOptions>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const limit = parseInt(request.query.limit, 10) || defaultLimit
      const offset = parseInt(request.query.offset, 10) || defaultOffset

      const data = await forumTopicService.getTopicList({ limit, offset })
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
    return undefined
  }

  public static createTopic = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const forumTopic = forumTopicSchema.parse(request.body)
      const result = await forumTopicService.createTopic(forumTopic)
      return response.json(result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new BadRequestError(JSON.stringify({ error: error.errors })))
      }
      next(error)
    }
    return undefined
  }
}

export default ForumTopicAPI
