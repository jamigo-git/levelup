export interface User {
  id: number
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
  avatar: UserAvatar
}

export type ChangePassword = {
  oldPassword: string
  newPassword: string
}

export type UserProfile = Omit<User, 'avatar' | 'id'>

export type UserAvatar = string
