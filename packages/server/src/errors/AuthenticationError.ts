import CustomError from './CustomErorr'
import { UNAUTHORIZED_CODE } from './errorCodes'

class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message, UNAUTHORIZED_CODE)
    this.name = 'AuthenticationError'
  }
}

export default AuthenticationError
