import { Button, Typography, Form, Input, message, Spin } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { fetchCurrentUser } from '@/store/slices/auth/authSlice'
import { routes } from '@/routing/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getUser } from '@/store/slices/auth/authSelector'
import { useState } from 'react'
import { editProfile } from '@/store/slices/user/userSlice'
import { emailRules, phoneRules, firstNameRules, secondNameRules, loginRules } from '@/utils/validation'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import styles from './Profile.module.scss'
import { UserDTO } from '@/types/AuthTypes'
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword'
import { UserProfile } from '@/types/UserTypes'
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar'

const { Title } = Typography

export const Profile: React.FC = () => {
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const [isEdit, setIsEdit] = useState(false)

  if (!user) {
    return <Spin fullscreen size='large' />
  }

  const {
    avatar,
    email,
    login,
    first_name: firstName,
    second_name: secondName,
    display_name: displayName,
    phone,
  } = user

  const handleSubmit: FormProps<UserProfile>['onFinish'] = values => {
    dispatch(editProfile(values))
      .unwrap()
      .then(() => {
        message.success('Данные успешно изменены!')
        dispatch(fetchCurrentUser())
      })
      .catch(error => {
        message.error(`Ошибка: ${error}`)
      })
  }

  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.profile.title}</title>
      </Helmet>
      <Form
        initialValues={user || {}}
        className={styles.profileForm}
        name='basic'
        onFinish={handleSubmit}
        autoComplete='off'
        layout='horizontal'>
        <Title level={2}>Профиль</Title>
        <ErrorBoundary
          errorMessage='Извините, в данный момент невозможно изменить аватар.'
          fallback={<ProfileAvatar avatar={avatar} disabled isEdit={isEdit} />}>
          <ProfileAvatar avatar={avatar} isEdit={isEdit} />
        </ErrorBoundary>
        <Form.Item<UserDTO>
          label='Почта'
          name='email'
          className={styles.formItem}
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={isEdit ? emailRules : undefined}>
          {isEdit ? <Input className={styles.input} /> : <Typography className={styles.text}>{email}</Typography>}
        </Form.Item>
        <Form.Item<UserDTO>
          label='Логин'
          name='login'
          className={styles.formItem}
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={isEdit ? loginRules : undefined}>
          {isEdit ? <Input className={styles.input} /> : <Typography className={styles.text}>{login}</Typography>}
        </Form.Item>
        <Form.Item<UserDTO>
          label='Имя'
          name='first_name'
          className={styles.formItem}
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={isEdit ? firstNameRules : undefined}>
          {isEdit ? <Input className={styles.input} /> : <Typography className={styles.text}>{firstName}</Typography>}
        </Form.Item>
        <Form.Item<UserDTO>
          label='Фамилия'
          name='second_name'
          className={styles.formItem}
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={isEdit ? secondNameRules : undefined}>
          {isEdit ? <Input className={styles.input} /> : <Typography className={styles.text}>{secondName}</Typography>}
        </Form.Item>
        <Form.Item<UserDTO> label='Псевдоним' name='display_name' className={styles.formItem}>
          {isEdit ? <Input className={styles.input} /> : <Typography className={styles.text}>{displayName}</Typography>}
        </Form.Item>
        <Form.Item<UserDTO>
          label='Телефон'
          name='phone'
          className={styles.formItem}
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={isEdit ? phoneRules : undefined}>
          {isEdit ? <Input className={styles.input} /> : <Typography className={styles.text}>{phone}</Typography>}
        </Form.Item>
        <div className={styles.formFooter}>
          {!isEdit ? (
            <>
              <Form.Item>
                <Button htmlType='submit' type='primary' onClick={() => setIsEdit(true)} block>
                  Редактировать профиль
                </Button>
              </Form.Item>
              <ErrorBoundary
                errorMessage='Извините, в данный момент невозможно изменить пароль.'
                fallback={
                  <Button block type='primary' disabled>
                    Поменять пароль
                  </Button>
                }>
                <ProfileChangePassword />
              </ErrorBoundary>
            </>
          ) : (
            <Form.Item>
              <Button block type='primary' htmlType='button' onClick={() => setIsEdit(false)}>
                Сохранить изменения
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </>
  )
}
