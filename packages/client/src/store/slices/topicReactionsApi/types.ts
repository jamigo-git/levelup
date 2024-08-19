import { TopicReactionsData } from '@/types/emojiTopicReactions'

export type GetTopicReactionsListResponse = {
  list: TopicReactionsData[]
}

export type AddTopicReactionsRequest = {
  topicId: number
  userId: number
  emoji: string
  unified: string
}

export type AddTopicReactionsResponse = {
  id: string
}

export type DeleteTopicReactionsRequest = {
  id: string
}
