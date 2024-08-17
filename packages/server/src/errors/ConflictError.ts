import CustomError from './CustomErorr'
import { CONFLICT_CODE } from './errorCodes'

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, CONFLICT_CODE)
    this.name = 'ConflictError'
  }
}

export default ConflictError
