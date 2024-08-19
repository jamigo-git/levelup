import { User } from '../models/userModel'
import { BaseRESTService } from './baseRestService'

interface CreateUserRequest {
  id: number
  first_name: string
  second_name: string
  display_name?: string
  avatar?: string
}

class UserService implements BaseRESTService {
  public create = async (user: CreateUserRequest) => {
    const [foundUser, created] = await User.findOrCreate({
      where: { id: user.id },
      defaults: { ...user },
    })

    if (!created) {
      await foundUser.update(user)
    }

    return foundUser
  }
}

export default new UserService()
