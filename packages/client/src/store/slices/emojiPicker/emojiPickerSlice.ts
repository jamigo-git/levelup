import { createSlice } from '@reduxjs/toolkit'

interface EmojiPickerSliceState {
  isShowEmojiPicker: boolean
}

const initialStateMock: EmojiPickerSliceState = {
  isShowEmojiPicker: false,
}

export const emojiPickerSlice = createSlice({
  name: 'emojiPicker',
  initialState: initialStateMock,
  reducers: {
    setIsShowPicker: state => {
      state.isShowEmojiPicker = !state.isShowEmojiPicker
    },
  },
})

export const { setIsShowPicker } = emojiPickerSlice.actions
export default emojiPickerSlice.reducer
