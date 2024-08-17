import EmojiPicker, { Emoji, EmojiClickData, Theme } from 'emoji-picker-react'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getUser } from '@/store/slices/auth/authSelector'
import { addTopicReaction } from '@/store/slices/topicReactions/topicReactionsSlice'
import { getTopicReactions } from '@/store/slices/topicReactions/topicReactionsSelector'
import { Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { getEmojiPickerConfig } from '@/store/slices/emojiPicker/emojiPickerSelector'
import { setPickerConfig } from '@/store/slices/emojiPicker/emojiPickerSlice'
import { nanoid } from '@reduxjs/toolkit'
import { TopicReactionsData } from '@/types/emojiTopickReactions'
import styles from './ForumTopicReactions.module.scss'

interface TopicReactionsProps {
  topicId: string
}

export const ForumTopicReactions: FC<TopicReactionsProps> = ({ topicId }) => {
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()

  const topicReactions = useAppSelector(state => getTopicReactions(state, topicId))

  const defaultEmojiPickerConfig = {
    id: topicId,
    reactionsDefaultOpen: false,
    theme: Theme.DARK,
    open: false,
  }

  const { open, theme } = useAppSelector(state => getEmojiPickerConfig(state, topicId)) || defaultEmojiPickerConfig

  const handleReaction = (emojiData: EmojiClickData) => {
    const topicReactionsSend: TopicReactionsData = {
      id: nanoid(),
      topicId,
      userId: user?.id || 0,
      emoji: emojiData.emoji,
      unified: emojiData.unified,
    }
    dispatch(addTopicReaction({ data: topicReactionsSend }))
  }

  return (
    <div className={styles.emojiContainer}>
      {topicReactions?.map(f => {
        return (
          <div key={f.emoji} className={styles.reactionContainer}>
            <Emoji unified={f.unified} />
            <div>{f.amount}</div>
          </div>
        )
      })}
      <div>
        <Button
          id='emoji-picker-btn'
          type='primary'
          shape='circle'
          icon={<SmileOutlined />}
          onClick={() => dispatch(setPickerConfig({ id: topicId, reactionsDefaultOpen: true, theme, open: !open }))}
        />
        <div className={styles.emojiPicker}>
          <EmojiPicker
            open={open}
            reactionsDefaultOpen
            onReactionClick={handleReaction}
            onEmojiClick={handleReaction}
            theme={theme}
            className={styles.emojiPicker}
          />
        </div>
      </div>
    </div>
  )
}
