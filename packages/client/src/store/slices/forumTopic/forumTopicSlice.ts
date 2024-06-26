import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Topic } from '@/types/forum'
import { topicListMock } from '@/utils/mocks'

const initialStateMock: { idList: string[]; byId: Record<string, Topic> } = {
  idList: topicListMock.map(topic => topic.id),
  byId: topicListMock.reduce(
    (acc, topic) => {
      acc[topic.id] = topic
      return acc
    },
    {} as Record<string, Topic>
  ),
}

export const forumTopicSlice = createSlice({
  name: 'forumTopic',
  initialState: initialStateMock,
  reducers: {
    addTopick: (state, action: PayloadAction<{ topic: Topic }>) => {
      state.idList.unshift(action.payload.topic.id)
      state.byId[action.payload.topic.id] = action.payload.topic
    },
    addTopickMessage: (state, action: PayloadAction<{ topicId: string; messageId: string }>) => {
      const topic = state.byId[action.payload.topicId]
      if (topic) {
        topic.messageIds.push(action.payload.messageId)
      }
    },
  },
})

export const { addTopick, addTopickMessage } = forumTopicSlice.actions
export default forumTopicSlice.reducer
