import { FC, useState } from 'react'
import { Button, Flex, Form, Input, message, Modal } from 'antd'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { passwordRules } from '@/utils/validation'
import { changePassword } from '@/store/slices/user/userSlice'
import { ChangePassword } from '@/types/UserTypes'

interface FormValues {
  oldPassword: string
  newPassword: string
}

export const ProfileChangePassword: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm<FormValues>()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useAppDispatch()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setConfirmLoading(false)
  }

  const handleSubmit = (values: FormValues) => {
    setConfirmLoading(true)

    dispatch(changePassword(values))
      .unwrap()
      .then(() => {
        message.success('Смена пароля успешно завершена!')
        setConfirmLoading(false)
        setIsModalOpen(false)
      })
      .catch(error => {
        message.error(`Смена пароля произошла с ошибкой: ${error}`)
        setConfirmLoading(false)
      })
  }

  return (
    <>
      <Button block type='primary' onClick={showModal}>
        Поменять пароль
      </Button>
      <Modal
        title='Смена пароля'
        width={400}
        open={isModalOpen}
        centered
        footer={null}
        closeIcon={null}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}>
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Form.Item<ChangePassword>
            label='Старый пароль'
            name='oldPassword'
            validateFirst
            hasFeedback
            validateTrigger='onChange'
            rules={passwordRules}>
            <Input.Password />
          </Form.Item>

          <Form.Item<ChangePassword>
            label='Новый пароль'
            name='newPassword'
            validateFirst
            hasFeedback
            validateTrigger='onChange'
            rules={passwordRules}>
            <Input.Password />
          </Form.Item>

          <Flex justify='flex-end' gap={8}>
            <Button onClick={handleCancel}>Отмена</Button>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Поменять
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}
