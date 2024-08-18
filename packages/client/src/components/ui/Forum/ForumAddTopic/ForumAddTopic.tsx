import { FC, useState } from 'react'
import { Button, Flex, Form, Input, Modal, message as antdMessage } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import { getUser } from '@/store/slices/auth/authSelector'
import { useAppSelector } from '@/hooks/reduxHooks'
import { AddTopicRequestBody, useAddTopicMutation } from '@/store/slices/forumApi'
import { ForumLoginSuggest } from '../ForumLoginSuggest'

interface FormValues {
  title: string
  message?: string
}

export const ForumAddTopic: FC = () => {
  const user = useAppSelector(getUser)
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm<FormValues>()

  const [addNewTopic, { isLoading }] = useAddTopicMutation()

  if (!user) {
    return <ForumLoginSuggest />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmit = async (values: FormValues) => {
    const { title, message } = values

    const newTopic: AddTopicRequestBody = {
      title,
      message,
      userId: 1 || user.id,
    }

    try {
      const reply = await addNewTopic({ topic: newTopic }).unwrap()
      if (reply) {
        form.resetFields()
        handleCancel()
      }
    } catch (err) {
      antdMessage.error('Что-то пошло не так при отправке сообщения')
    }
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
        confirmLoading={isLoading}>
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
            <Button type='primary' htmlType='submit' loading={isLoading}>
              {t('ForumAddTopic.ForumAddTopicModal.createButtonText')}
            </Button>
          </Flex>
        </Form>
      </Modal>
    </ErrorBoundary>
  )
}
