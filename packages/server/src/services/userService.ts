import { User } from '../models/userModel'
import { BaseRESTService } from './baseRestService'

interface CreateUserRequest {
  id: number
  first_name: string
  second_name: string
  display_name?: string
}

class UserService implements BaseRESTService {
  public create = async (user: CreateUserRequest) => {
    return await User.findOrCreate({
      where: { id: user.id },
      defaults: { ...user },
    })
  }
}

export default new UserService()
