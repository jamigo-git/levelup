import { FC, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Button, Flex, Form, Input, Modal } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { addTopick } from '@/store/slices/forumTopic/forumTopicSlice'
import { addMessage } from '@/store/slices/forumMessage/forumMessageSlice'
import { getUser } from '@/store/slices/user/userSelector'
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

    // mock api call
    setTimeout(() => {
      if (newMessage) dispatch(addMessage({ message: newMessage }))
      dispatch(addTopick({ topic: newTopic }))
      handleCancel()
    }, 2000)
  }

  return (
    <>
      <Button icon={<PlusSquareOutlined />} iconPosition='end' onClick={showModal} size='large'>
        Добавить топик
      </Button>
      <Modal
        title='О чем поговорим?'
        width={400}
        open={isModalOpen}
        centered
        footer={null}
        closeIcon={null}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name='title' rules={[{ required: true, message: 'Без темы никак' }]}>
            <Input placeholder='Введите название темы' autoComplete='off' />
          </Form.Item>
          <Form.Item name='message'>
            <Input.TextArea rows={4} autoSize={{ minRows: 4, maxRows: 6 }} placeholder='Добавите первое сообщение?' />
          </Form.Item>
          <Flex justify='flex-end' gap={8}>
            <Button onClick={handleCancel}>Отмена</Button>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Создать
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}
