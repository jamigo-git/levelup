import { FC, useState } from 'react'
import { Button, Flex, Form, Input, message, Modal } from 'antd'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { passwordRules } from '@/utils/validation'
import { changePassword } from '@/store/slices/user/userSlice'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
        message.success(t('ProfileChangePassword.successMessage'))
        setConfirmLoading(false)
        setIsModalOpen(false)
      })
      .catch(error => {
        message.error(`${t('ProfileChangePassword.errorMessage')}: ${error}`)
        setConfirmLoading(false)
      })
  }

  return (
    <>
      <Button block type='primary' onClick={showModal}>
        {t('ProfileChangePassword.changePasswordButtonText')}
      </Button>
      <Modal
        title={t('ProfileChangePassword.title')}
        width={400}
        open={isModalOpen}
        centered
        footer={null}
        closeIcon={null}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}>
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Form.Item<ChangePassword>
            label={t('ProfileChangePassword.oldPassword')}
            name='oldPassword'
            validateFirst
            hasFeedback
            validateTrigger='onChange'
            rules={passwordRules}>
            <Input.Password />
          </Form.Item>

          <Form.Item<ChangePassword>
            label={t('ProfileChangePassword.newPassword')}
            name='newPassword'
            validateFirst
            hasFeedback
            validateTrigger='onChange'
            rules={passwordRules}>
            <Input.Password />
          </Form.Item>

          <Flex justify='flex-end' gap={8}>
            <Button onClick={handleCancel}>{t('ProfileChangePassword.cancelButtonText')}</Button>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              {t('ProfileChangePassword.changeButtonText')}
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}
