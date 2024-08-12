import CustomError from './CustomErorr'
import { NOT_FOUND_CODE } from './errorCodes'

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, NOT_FOUND_CODE)
    this.name = 'NotFoundError'
  }
}

export default NotFoundError
