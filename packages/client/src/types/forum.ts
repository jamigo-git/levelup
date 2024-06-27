import { User } from './user'

export interface Topic {
  id: string
  title: string
  createdAt: string
  author: Pick<User, 'display_name' | 'avatar'>
  messageIds: string[]
}

export interface Message {
  id: string
  text: string
  createdAt: string
  author: Pick<User, 'display_name' | 'avatar'>
}
