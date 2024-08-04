import { FC, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Button, Flex, Form, Input, Modal } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import { getUser } from '@/store/slices/auth/authSelector'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { addTopic } from '@/store/slices/forumTopic/forumTopicSlice'
import { addMessage } from '@/store/slices/forumMessage/forumMessageSlice'
import { useTranslation } from 'react-i18next'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import { Message, Topic } from '@/types/forum'
import { ForumLoginSuggest } from '../ForumLoginSuggest'

interface FormValues {
  title: string
  message?: string
}

export const ForumAddTopic: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm<FormValues>()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  if (!user) {
    return <ForumLoginSuggest />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setConfirmLoading(false)
    setTimeout(() => {
      form.resetFields()
    }, 300)
  }

  const handleSubmit = (values: FormValues) => {
    setConfirmLoading(true)

    const { title, message } = values

    const newTopic: Topic = {
      id: nanoid(),
      title,
      createdAt: new Date().toISOString(),
      author: user,
      messageIds: [],
    }

    let newMessage: Message | undefined
    if (message) {
      const messageId = nanoid()
      newMessage = {
        id: messageId,
        text: message,
        createdAt: new Date().toISOString(),
        author: user,
      }
      newTopic.messageIds.push(messageId)
    }

    if (newMessage) {
      dispatch(addMessage({ message: newMessage }))
    }
    dispatch(addTopic({ topic: newTopic }))
    handleCancel()
  }

  return (
    <ErrorBoundary>
      <Button icon={<PlusSquareOutlined />} iconPosition='end' onClick={showModal} size='large'>
        {t('ForumAddTopic.addTopicButtonText')}
      </Button>
      <Modal
        title={t('ForumAddTopic.ForumAddTopicModal.forumAddTopicModalTitle')}
        width={400}
        open={isModalOpen}
        centered
        footer={null}
        closeIcon={null}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name='title'
            rules={[{ required: true, message: `${t('ForumAddTopic.ForumAddTopicModal.requireRule')}` }]}>
            <Input placeholder={t('ForumAddTopic.ForumAddTopicModal.topicTitlePlaceholder')} autoComplete='off' />
          </Form.Item>
          <Form.Item name='message'>
            <Input.TextArea
              rows={4}
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder={t('ForumAddTopic.ForumAddTopicModal.topicSubTitlePlaceholder')}
            />
          </Form.Item>
          <Flex justify='flex-end' gap={8}>
            <Button onClick={handleCancel}>{t('ForumAddTopic.ForumAddTopicModal.cancelButtonText')}</Button>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              {t('ForumAddTopic.ForumAddTopicModal.createButtonText')}
            </Button>
          </Flex>
        </Form>
      </Modal>
    </ErrorBoundary>
  )
}
