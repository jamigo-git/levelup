import { FC, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'
import { getUser } from '@/store/slices/auth/authSelector'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { addMessage } from '@/store/slices/forumMessage/forumMessageSlice'
import { addTopicMessage } from '@/store/slices/forumTopic/forumTopicSlice'
import { useTranslation } from 'react-i18next'
import EmojiPicker, { Theme } from 'emoji-picker-react'
// import { getEmojiPicker } from '@/store/slices/emojiPicker/emojiPickerSelector'
// import emojiPickerSlice from '@/store/slices/emojiPicker/emojiPickerSlice'
import { Message } from '@/types/forum'
import { ForumLoginSuggest } from '../ForumLoginSuggest'
import styles from './ForumMessageForm.module.scss'

interface FormValues {
  message: string
}
interface ForumMessageFormProps {
  topicId: string
}

interface EmojiClickData {
  unified: string
  unifiedWithoutSkinTone: string
  emoji: string // the emoji character, for example: '😀'. Emoji ID in custom emojis
  isCustom: boolean // whether the emoji is a custom emoji or not
  names: string[]
  imageUrl: string // the url of the emoji image with the current emoji style applied
}
export const ForumMessageForm: FC<ForumMessageFormProps> = ({ topicId }) => {
  const [form] = Form.useForm<FormValues>()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const user = useAppSelector(getUser)
  //   const emojiPicker = useAppSelector(getEmojiPicker)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isShowEmojiPicker = true

  if (!user) {
    return <ForumLoginSuggest />
  }

  //   const setIsShowPicker = () => {
  //     dispatch(setIsShowPicker)
  //   }

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const inputRef = form.getFieldInstance('message')
    const currentValue = form.getFieldValue('message')
    const cursorPosition = inputRef.resizableTextArea?.textArea?.selectionStart
    const updatedValue = `${currentValue?.substring(0, cursorPosition) || ''}${emojiData.emoji}${currentValue?.substring(cursorPosition) || ''}`
    form.setFieldsValue({ message: updatedValue })
    inputRef.resizableTextArea.textArea.focus()
    const newCursorPosition = cursorPosition + 1
    inputRef.resizableTextArea.textArea.setSelectionRange(newCursorPosition, newCursorPosition)
  }

  const handleSubmit = (values: FormValues) => {
    setConfirmLoading(true)

    const messageId = nanoid()
    const newMessage: Message = {
      id: messageId,
      text: values.message,
      createdAt: new Date().toISOString(),
      author: user,
    }

    dispatch(addMessage({ message: newMessage }))
    dispatch(addTopicMessage({ topicId, messageId }))
    form.resetFields()
    setConfirmLoading(false)
  }

  return (
    <div className={styles.formWrapper}>
      <Form form={form} onFinish={handleSubmit} className={styles.form}>
        <Form.Item name='message' rules={[{ required: true, message: `${t('ForumMessageForm.requireRule')}` }]}>
          <Input.TextArea
            placeholder={t('ForumMessageForm.topicMessageTextPlaceholder')}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item className={styles.form__submit}>
          <Button type='primary' htmlType='submit' loading={confirmLoading}>
            {t('ForumMessageForm.sendButtonText')}
          </Button>
          <Button
            type='primary'
            shape='circle'
            icon={<SmileOutlined />}
            loading={confirmLoading}
            // onClick={() => dispatch(setIsShowPicker)}
          />
          {isShowEmojiPicker && (
            <EmojiPicker
              theme={Theme.DARK}
              onEmojiClick={onEmojiClick}
              //   style={{
              //     position: 'absolute',
              //     bottom: '80px',
              //     right: '200px',
              //     zIndex: 9999,
              //   }}
            />
          )}
        </Form.Item>
      </Form>
    </div>
  )
}
