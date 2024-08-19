import CustomError from './CustomErorr'
import { BAD_REQUEST_CODE } from './errorCodes'

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, BAD_REQUEST_CODE)
    this.name = 'BadRequestError'
  }
}

export default BadRequestError
