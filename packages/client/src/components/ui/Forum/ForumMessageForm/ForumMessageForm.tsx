import { FC, useEffect, useRef } from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { getUser } from '@/store/slices/auth/authSelector'
import { useTranslation } from 'react-i18next'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import { getEmojiPickerConfig } from '@/store/slices/emojiPicker/emojiPickerSelector'
import { setPickerConfig } from '@/store/slices/emojiPicker/emojiPickerSlice'
import { TextAreaRef } from 'antd/es/input/TextArea'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { AddCommentRequestBody, useAddCommentMutation } from '@/store/slices/forumApi'
import { Comment } from '@/types/forum'
import { ForumLoginSuggest } from '../ForumLoginSuggest'
import styles from './ForumMessageForm.module.scss'

interface FormValues {
  message: string
}
interface ForumMessageFormProps {
  topicId: number
  commentToReply?: Comment
  onReply: () => void
}

interface EmojiClickData {
  unified: string
  unifiedWithoutSkinTone: string
  emoji: string
  isCustom: boolean
  names: string[]
  imageUrl: string
}

export const ForumMessageForm: FC<ForumMessageFormProps> = ({ topicId, commentToReply, onReply }) => {
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const defaultEmojiPickerConfig = {
    id: topicId,
    reactionsDefaultOpen: false,
    theme: Theme.DARK,
    open: false,
  }

  const { open, theme } = useAppSelector(state => getEmojiPickerConfig(state, topicId)) || defaultEmojiPickerConfig
  const { t } = useTranslation()
  const [form] = Form.useForm<FormValues>()
  const inputRef = useRef<TextAreaRef>(null)
  const [addNewComment, { isLoading }] = useAddCommentMutation()

  useEffect(() => {
    if (commentToReply && inputRef) {
      inputRef.current?.focus()
      form.setFieldValue('message', `${commentToReply.user.display_name || commentToReply.user.first_name}, `)
    }
  }, [commentToReply, form])

  if (!user) {
    return <ForumLoginSuggest />
  }

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

  const handleSubmit = async (values: FormValues) => {
    const newMessage: AddCommentRequestBody = {
      text: values.message,
      topicId,
      parentId: commentToReply?.id,
    }

    try {
      const reply = await addNewComment({ comment: newMessage }).unwrap()
      if (reply) {
        form.resetFields()
        onReply()
      }
    } catch (err) {
      message.error('Что-то пошло не так при отправке сообщения')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <Form form={form} onFinish={handleSubmit} className={styles.form}>
        <Form.Item name='message' rules={[{ required: true, message: `${t('ForumMessageForm.requireRule')}` }]}>
          <Input.TextArea
            ref={inputRef}
            placeholder={t('ForumMessageForm.topicMessageTextPlaceholder')}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item className={styles.form__submit}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            {t('ForumMessageForm.sendButtonText')}
          </Button>
          <Button
            id='emoji-picker-btn'
            type='primary'
            shape='circle'
            icon={<SmileOutlined />}
            onClick={() => dispatch(setPickerConfig({ id: topicId, reactionsDefaultOpen: false, theme, open: !open }))}
          />
          <EmojiPicker open={open} theme={theme} reactionsDefaultOpen={false} onEmojiClick={onEmojiClick} />
        </Form.Item>
      </Form>
    </div>
  )
}
