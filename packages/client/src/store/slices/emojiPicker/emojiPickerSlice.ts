import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Theme } from 'emoji-picker-react'
import { EmojiPickerConfig } from '@/types/emojiTopicReactions'

interface EmojiPickerSliceState {
  data: EmojiPickerConfig[]
}

const initialStateMock: EmojiPickerSliceState = {
  data: [],
}

export const emojiPickerSlice = createSlice({
  name: 'emojiPicker',
  initialState: initialStateMock,
  reducers: {
    setPickerConfig: (state, action: PayloadAction<EmojiPickerConfig>) => {
      const { id, reactionsDefaultOpen, theme, open } = action.payload
      const pickerConfig = state.data.find(f => f.id === id)
      /** Если открыли один пикер, закрываем другие */
      if (open)
        state.data.forEach(f => {
          f.open = false
        })
      /** Если конфиг найден в сторе записываем данные */
      if (pickerConfig) {
        pickerConfig.reactionsDefaultOpen = reactionsDefaultOpen
        pickerConfig.theme = theme
        pickerConfig.open = open
      } else {
        /** Иначе создаем конфиг с данными из запроса */
        const emojiPickerConfig = {
          id,
          reactionsDefaultOpen: reactionsDefaultOpen ?? false,
          theme: theme ?? Theme.DARK,
          open: open ?? false,
        }
        state.data.push(emojiPickerConfig)
      }
    },
  },
})

export const { setPickerConfig } = emojiPickerSlice.actions
export default emojiPickerSlice.reducer
