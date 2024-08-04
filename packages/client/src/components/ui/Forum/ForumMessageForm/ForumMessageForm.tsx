import { FC, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { nanoid } from '@reduxjs/toolkit'
import { getUser } from '@/store/slices/auth/authSelector'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { addMessage } from '@/store/slices/forumMessage/forumMessageSlice'
import { addTopicMessage } from '@/store/slices/forumTopic/forumTopicSlice'
import { useTranslation } from 'react-i18next'
import { Message } from '@/types/forum'
import { ForumLoginSuggest } from '../ForumLoginSuggest'
import styles from './ForumMessageForm.module.scss'

interface FormValues {
  message: string
}
interface ForumMessageFormProps {
  topicId: string
}
export const ForumMessageForm: FC<ForumMessageFormProps> = ({ topicId }) => {
  const [form] = Form.useForm<FormValues>()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  if (!user) {
    return <ForumLoginSuggest />
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
        </Form.Item>
      </Form>
    </div>
  )
}
