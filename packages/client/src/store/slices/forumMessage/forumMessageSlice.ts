import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Message } from '@/types/forum'

interface ForumMessageSliceState {
  idList: string[]
  byId: Record<string, Message>
}

const initialStateMock: ForumMessageSliceState = {
  idList: [],
  byId: {},
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
