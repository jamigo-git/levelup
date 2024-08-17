import { GrpTopicReactionsData } from '@/types/emojiTopickReactions'
import { RootState } from '../..'

export const getAllTopicReactions = (state: RootState) => state.topicReactions

export const getTopicReactions = (state: RootState, topicId: number): GrpTopicReactionsData[] | null => {
  if (!topicId) return []
  const allTopicReactions = getAllTopicReactions(state).data?.filter(f => f?.topicId === topicId)
  const reactionsByEmoji: { [key: string]: GrpTopicReactionsData } = {}

  if (allTopicReactions.length)
    allTopicReactions.forEach(f => {
      if (reactionsByEmoji[f.emoji]) {
        reactionsByEmoji[f.emoji].amount += 1
      } else {
        reactionsByEmoji[f.emoji] = { emoji: f.emoji, amount: 1, unified: f.unified }
      }
    })
  return Object.keys(reactionsByEmoji ?? {}).length ? Array.from(Object.values(reactionsByEmoji)) : []
}
