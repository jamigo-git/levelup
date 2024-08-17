import { User } from './UserTypes'

export interface Topic {
  id: number
  title: string
  createdAt: string
  user: Pick<User, 'display_name' | 'first_name' | 'avatar'>
  commentCount: string[]
}

export interface Comment {
  id: number
  text: string
  createdAt: string
  user: Pick<User, 'display_name' | 'first_name' | 'avatar'>
  parentId?: string
  replies?: Comment[]
}
