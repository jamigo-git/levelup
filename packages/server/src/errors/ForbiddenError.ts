import CustomError from './CustomErorr'
import { FORBIDDEN_CODE } from './errorCodes'

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, FORBIDDEN_CODE)
    this.name = 'ForbiddenError'
  }
}

export default ForbiddenError
