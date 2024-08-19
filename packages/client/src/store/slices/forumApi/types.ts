import { Comment, Topic } from '@/types/forum'

export type GetTopicListResponse = {
  list: Topic[]
  total: number
}

export type AddTopicRequestBody = {
  title: string
  message?: string
}

export type GetCommentListResponse = {
  list: Comment[]
  total: number
}

export type AddCommentRequestBody = {
  topicId: number
  text: string
  parentId?: number
}
