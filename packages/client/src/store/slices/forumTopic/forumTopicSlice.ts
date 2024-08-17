import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Topic } from '@/types/forum'
import { topicListMock } from '@/__mocks__/mocks'

interface ForumTopicSliceState {
  idList: string[]
  byId: Record<string, Topic>
}
const initialStateMock: ForumTopicSliceState = {
  idList: topicListMock.map(f => f.id),
  byId: topicListMock.reduce(
    (sum, cur) => {
      sum[cur.id] = cur
      return sum
    },
    {} as Record<string, Topic>
  ),
}

export const forumTopicSlice = createSlice({
  name: 'forumTopic',
  initialState: initialStateMock,
  reducers: {
    addTopic: (state, action: PayloadAction<{ topic: Topic }>) => {
      state.idList.unshift(action.payload.topic.id)
      state.byId[action.payload.topic.id] = action.payload.topic
    },
    addTopicMessage: (state, action: PayloadAction<{ topicId: string; messageId: string }>) => {
      const topic = state.byId[action.payload.topicId]
      if (topic) {
        topic.messageIds.push(action.payload.messageId)
      }
    },
  },
})

export const { addTopic, addTopicMessage } = forumTopicSlice.actions
export default forumTopicSlice.reducer
