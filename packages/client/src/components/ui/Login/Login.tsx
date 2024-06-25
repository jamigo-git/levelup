import { Button, Typography, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { login } from '@/store/slices/auth/authSlice'
import { routes } from '@/routing/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getIsAuth } from '@/store/slices/auth/authSelector'
import * as Validation from '@/utils/validation'
import { NavLink } from 'react-router-dom'
import { Rule } from 'antd/es/form'
import styles from './LoginPage.module.scss'

const { Title } = Typography

type FieldType = {
  username?: string
  password?: string
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.error('Failed:', errorInfo)
}

const loginRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите логин!',
  },
  () => ({
    validator(_, value) {
      if (Validation.login(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Логин не соответствует требованиям'))
    },
  }),
]

const passwordRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите пароль!',
  },
  () => ({
    validator(_, value) {
      if (Validation.password(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Пароль не соответствует требованиям'))
    },
  }),
]

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getIsAuth)

  const fakeLogin = () => {
    dispatch(login())
  }

  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.login.title}</title>
      </Helmet>
      <Form
        {...formItemLayout}
        className={styles.loginForm}
        name='basic'
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='on'
        layout='vertical'>
        <div className={styles.modalHeader}>
          <Title level={2}>Вход</Title>
        </div>

        <Form.Item<FieldType>
          label='Login'
          name='username'
          validateFirst
          rules={loginRules}
          className={styles.inputForm}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          validateFirst
          rules={passwordRules}
          className={styles.inputForm}>
          <Input.Password />
        </Form.Item>

        <div className='modalHeader'>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type='primary' htmlType='submit' onClick={fakeLogin} className={styles.formBotton}>
              Login
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <NavLink to={routes.registration.path}>
              <Button type='default' className={styles.formBotton}>
                Registration
              </Button>
            </NavLink>
          </Form.Item>
          <Typography>logged in: {isAuth.toString()}</Typography>
        </div>
      </Form>
    </>
  )
}
