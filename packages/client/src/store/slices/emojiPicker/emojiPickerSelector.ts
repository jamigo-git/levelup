import { EmojiPickerConfig } from '@/types/emojiTopickReactions'
import { RootState } from '../..'

export const getAllEmojiPickerConfigs = (store: RootState) => store.emojiPicker

export const getEmojiPickerConfig = (state: RootState, id: string): EmojiPickerConfig | null => {
  const allEmojiPickerConfig = getAllEmojiPickerConfigs(state).data
  const emojiPickerConfig: EmojiPickerConfig | undefined = allEmojiPickerConfig?.find(f => f?.id === id)
  return emojiPickerConfig ?? null
}
