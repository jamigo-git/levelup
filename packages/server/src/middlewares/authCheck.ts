import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

import { EXTERNAL_API_URL } from '../utils/constants'
import AuthenticationError from '../errors/AuthenticationError'

export const authCheck = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const cookies = req.headers.cookie

    if (!cookies) {
      next(new AuthenticationError('Unauthorized: No cookies found'))
    }

    const response = await axios.get(`${EXTERNAL_API_URL}/auth/user`, {
      headers: {
        Cookie: cookies,
      },
    })

    if (response.status === 200 || response.status === 304) {
      return next()
    } else {
      next(new AuthenticationError('Unauthorized: No cookies found'))
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        next(new AuthenticationError('Unauthorized'))
      }
      next(new Error(error.response.data.message))
    }
    next(new Error('Internal server error'))
  }
}
