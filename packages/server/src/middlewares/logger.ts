import winston from 'winston'
import { Request, Response, NextFunction } from 'express'

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/requests.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
  ],
})

export function requestLogger(req: Request, _: Response, next: NextFunction) {
  logger.info({
    message: 'Request',
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  })
  next()
}

// Error logger middleware
export function errorLogger(err: unknown, _: Request, __: Response, next: NextFunction) {
  logger.error({
    message: 'Error',
    error: err,
    timestamp: new Date().toISOString(),
  })
  next(err)
}
