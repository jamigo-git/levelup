import { z } from 'zod'
import type { NextFunction, Request, Response } from 'express'
import userService from '../services/userService'
import BadRequestError from '../errors/BadRequestError'

const userSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  second_name: z.string(),
  display_name: z.string().optional(),
})

class UserAPI {
  public static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = userSchema.parse(req.body)
      await userService.create(user)
      res.status(200).send('OK')
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new BadRequestError(JSON.stringify({ error: error.errors })))
      }
      next(error)
    }
  }
}

export default UserAPI
