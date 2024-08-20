import { z } from 'zod'
import type { NextFunction, Request, Response } from 'express'
import forumTopicReactionService from '../services/forumTopicReactionService'
import BadRequestError from '../errors/BadRequestError'

interface TopicReactionListOptions {
  topicIds: string
}

const forumTopicReactionSchema = z.object({
  topicId: z.number(),
  userId: z.number(),
  emoji: z.string(),
  unified: z.string(),
})

const topicReactionDeleteSchema = z.object({
  id: z.number(),
})

class ForumTopicAPI {
  public static createTopicReaction = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const topicReaction = forumTopicReactionSchema.parse(request.body)
      const result = await forumTopicReactionService.createTopicReaction(topicReaction)
      return response.json(result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new BadRequestError(JSON.stringify({ error: error.errors })))
      }
      next(error)
    }
    return undefined
  }

  public static deleteTopicReaction = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = topicReactionDeleteSchema.parse(request.body)
      const result = await forumTopicReactionService.deleteTopicReaction({ id })
      return response.json(result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new BadRequestError(JSON.stringify({ error: error.errors })))
      }
      next(error)
    }
    return undefined
  }

  public static getTopicReactionsList = async (
    request: Request<unknown, unknown, unknown, TopicReactionListOptions>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const topicIds = request.query.topicIds.split(',')
      const data = await forumTopicReactionService.getTopicReactionList({ topicIds })
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
    return undefined
  }
}

export default ForumTopicAPI
