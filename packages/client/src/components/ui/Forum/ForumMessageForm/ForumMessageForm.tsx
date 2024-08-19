import { FC, useEffect, useRef } from 'react'
import { Button, Form, Input, message } from 'antd'
import { getUser } from '@/store/slices/auth/authSelector'
import { useTranslation } from 'react-i18next'
import { TextAreaRef } from 'antd/es/input/TextArea'

import { useAppSelector } from '@/hooks/reduxHooks'
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
export const ForumMessageForm: FC<ForumMessageFormProps> = ({ topicId, commentToReply, onReply }) => {
  const user = useAppSelector(getUser)
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
        </Form.Item>
      </Form>
    </div>
  )
}
