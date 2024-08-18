import { Theme } from 'emoji-picker-react'

export interface TopicReactionsData {
  id: string
  topicId: number
  userId: number
  emoji: string
  unified: string
  amount?: number
}

/** Интерфейс групповых реакций на топик, хранит в себе количество и эмоджи */
export interface GrpTopicReactionsData {
  emoji: string
  unified: string
  amount: number
}

/** Конфигурация каждого отдельного пикера */
export interface EmojiPickerConfig {
  id: number
  reactionsDefaultOpen: boolean
  theme: Theme
  open: boolean
}
