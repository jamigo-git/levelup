import EmojiPicker, { Emoji, EmojiClickData, Theme } from 'emoji-picker-react'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getUser } from '@/store/slices/auth/authSelector'
import { Button, message as antdMessage } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { getEmojiPickerConfig } from '@/store/slices/emojiPicker/emojiPickerSelector'
import { setPickerConfig } from '@/store/slices/emojiPicker/emojiPickerSlice'
import {
  useAddTopicReactionMutation,
  useDeleteTopicReactionMutation,
  useGetTopicReactionsListQuery,
} from '@/store/slices/topicReactionsApi'
import { GrpTopicReactionsData, TopicReactionsData } from '@/types/emojiTopicReactions'
import styles from './ForumTopicReactions.module.scss'

interface TopicReactionsProps {
  topicId: number
}

export const ForumTopicReactions: FC<TopicReactionsProps> = ({ topicId }) => {
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetTopicReactionsListQuery({ topicIds: [topicId] })
  const [addNewTopicReaction] = useAddTopicReactionMutation()
  const [deleteTopicReaction] = useDeleteTopicReactionMutation()
  const topicReactionsObj: { [key: string]: GrpTopicReactionsData } = {}

  data?.list.forEach(f => {
    if (topicReactionsObj[f.emoji]) {
      topicReactionsObj[f.emoji].amount += 1
    } else {
      topicReactionsObj[f.emoji] = { emoji: f.emoji, amount: 1, unified: f.unified }
    }
  })

  const topicReactions = Array.from(Object.values(topicReactionsObj))

  const defaultEmojiPickerConfig = {
    id: topicId,
    reactionsDefaultOpen: false,
    theme: Theme.DARK,
    open: false,
  }

  const { open, theme } = useAppSelector(state => getEmojiPickerConfig(state, topicId)) || defaultEmojiPickerConfig

  const handleReaction = async (emojiData: EmojiClickData) => {
    const sameUserReaction = data?.list.find(f => f.userId === user?.id && f.emoji === emojiData.emoji)
    if (sameUserReaction?.id) {
      try {
        await deleteTopicReaction({ id: sameUserReaction.id })
      } catch (err) {
        antdMessage.error('Что-то пошло не так при удалении эмодзи')
      }
    } else {
      const topicReactionsSend: TopicReactionsData = {
        topicId,
        emoji: emojiData.emoji,
        unified: emojiData.unified,
      }
      try {
        addNewTopicReaction({ reaction: topicReactionsSend }).unwrap()
      } catch (err) {
        antdMessage.error('Что-то пошло не так при отправке эмодзи')
      }
    }
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
          loading={isLoading}
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
