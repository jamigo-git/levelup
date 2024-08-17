import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { TopicReactionsData } from '@/types/emojiTopickReactions'

interface TopicReactionsState {
  data: TopicReactionsData[]
}

const initialStateMock: TopicReactionsState = {
  data: [],
}

export const topicReactionsSlice = createSlice({
  name: 'forumTopicReactions',
  initialState: initialStateMock,
  reducers: {
    addTopicReaction: (state, action: PayloadAction<{ data: TopicReactionsData }>) => {
      const { topicId, userId, emoji, unified } = action.payload.data
      const sameUserReaction = state.data.find(f => f.topicId === topicId && f.userId === userId && f.emoji === emoji)
      /** Если пользователь уже оставлял данную реакцию удалим ее */
      if (sameUserReaction) {
        state.data = state.data.filter(f => f.id !== sameUserReaction.id)
      } else {
        state.data.push({
          id: nanoid(),
          topicId,
          userId,
          emoji,
          unified,
        })
      }
    },
  },
})

export const { addTopicReaction } = topicReactionsSlice.actions
export default topicReactionsSlice.reducer
