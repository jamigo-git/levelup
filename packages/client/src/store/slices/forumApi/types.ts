import { Comment, Topic } from '@/types/forum'

export type GetTopicListResponse = {
  list: Topic[]
  total: number
}

export type AddTopicRequestBody = {
  title: string
  userId: number
  message?: string
}

export type GetCommentListResponse = {
  list: Comment[]
  total: number
}

export type AddCommentRequestBody = {
  topicId: number
  userId: number
  text: string
  parentId?: number
}
