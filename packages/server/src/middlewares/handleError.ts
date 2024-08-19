import { Request, Response, NextFunction } from 'express'
import CustomError from '../errors/CustomErorr'

export const handleError = (err: unknown, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    const { statusCode = 500, message } = err

    res.status(statusCode).send({
      message: statusCode === 500 ? 'Internal server error' : message,
    })
  } else {
    res.status(500).send({
      message: 'Internal server error',
    })
  }

  next()
}
