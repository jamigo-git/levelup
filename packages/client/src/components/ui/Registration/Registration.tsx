import { Button, Typography, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { login } from '@/store/slices/auth/authSlice'
import { routes } from '@/routing/routes'
import { emailRules, phoneRules, firstNameRules, secondNameRules, passwordRules, loginRules } from '@/utils/validation'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { NavLink } from 'react-router-dom'
import styles from './RegistrationPage.module.scss'

const { Title } = Typography

type FieldType = {
  username?: string
  password?: string
  email?: string
  name?: string
  secondName?: string
  phone?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.error('Failed:', errorInfo)
}

export const Registration = () => {
  const dispatch = useAppDispatch()
  //   const isAuth = useAppSelector(getIsAuth)

  const fakeRegistration = () => {
    dispatch(login())
  }

  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.registration.title}</title>
      </Helmet>
      <Form
        className={styles.registrationForm}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
        validateMessages={validateMessages}>
        <div className={styles.modalHeader}>
          <Title level={2}>Регистрация</Title>
        </div>

        <Form.Item<FieldType>
          label='Имя'
          name='name'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={firstNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Фамилия'
          name='secondName'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={secondNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Email'
          name='email'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Телефон'
          name='phone'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={phoneRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Login'
          name='username'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={loginRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={passwordRules}>
          <Input.Password />
        </Form.Item>

        <div className={styles.modalFooter}>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type='primary' htmlType='submit' onClick={fakeRegistration} className={styles.formBotton}>
              Registration
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <NavLink to={routes.login.path}>
              <Button type='default' className={styles.formBotton}>
                Login
              </Button>
            </NavLink>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
