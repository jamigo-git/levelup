import { Button, Typography, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { login } from '@/store/slices/auth/authSlice'
import { routes } from '@/routing/routes'
import { passwordRules, loginRules } from '@/utils/validation'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getIsAuth } from '@/store/slices/auth/authSelector'
import { NavLink } from 'react-router-dom'
import styles from './LoginPage.module.scss'

const { Title } = Typography

type FieldType = {
  username?: string
  password?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.error('Failed:', errorInfo)
}

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
        className={styles.loginForm}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'>
        <div className={styles.modalHeader}>
          <Title level={2}>Вход</Title>
        </div>

        <Form.Item<FieldType>
          label='Login'
          name='username'
          validateFirst
          rules={loginRules}
          hasFeedback
          validateTrigger='onChange'>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          validateFirst
          rules={passwordRules}
          hasFeedback
          validateTrigger='onChange'>
          <Input.Password />
        </Form.Item>

        <div className={styles.modalFooter}>
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
