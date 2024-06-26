import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Message } from '@/types/forum'
import { messageListMock } from '@/utils/mocks'

const initialStateMock: { idList: string[]; byId: Record<string, Message> } = {
  idList: messageListMock.map(message => message.id),
  byId: messageListMock.reduce(
    (acc, message) => {
      acc[message.id] = message
      return acc
    },
    {} as Record<string, Message>
  ),
}

export const forumMessageSlice = createSlice({
  name: 'forumMessage',
  initialState: initialStateMock,
  reducers: {
    addMessage: (state, action: PayloadAction<{ message: Message }>) => {
      state.idList.push(action.payload.message.id)
      state.byId[action.payload.message.id] = action.payload.message
    },
  },
})

export const { addMessage } = forumMessageSlice.actions
export default forumMessageSlice.reducer
