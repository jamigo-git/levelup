import { Button, Typography, Form, Input, message } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { fetchCurrentUser, login } from '@/store/slices/auth/authSlice'
import { NavLink } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { passwordRules, loginRules } from '@/utils/validation'
import { useAppDispatch } from '@/hooks/reduxHooks'
import styles from './LoginPage.module.scss'
import { LoginRequestData } from '@/types/AuthTypes'

const { Title } = Typography

const onFinishFailed: FormProps<LoginRequestData>['onFinishFailed'] = errorInfo => {
  message.error(`Login error: ${errorInfo.errorFields[0].errors[0]}`)
}

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()

  const onFinish: FormProps<LoginRequestData>['onFinish'] = values => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        message.success('You have successfully logged in')
        dispatch(fetchCurrentUser())
      })
      .catch(error => {
        message.error(`Login error: ${error}`)
      })
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

        <Form.Item<LoginRequestData>
          label='Login'
          name='login'
          validateFirst
          rules={loginRules}
          hasFeedback
          validateTrigger='onChange'>
          <Input />
        </Form.Item>

        <Form.Item<LoginRequestData>
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
            <Button type='primary' htmlType='submit' className={styles.formBotton}>
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
        </div>
      </Form>
    </>
  )
}
