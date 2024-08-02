import { Button, Typography, Form, Input, message, Divider } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { fetchCurrentUser, login } from '@/store/slices/auth/authSlice'
import { NavLink } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { passwordRules, loginRules } from '@/utils/validation'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { OAuthButton } from '@/components/ui/common/OAuthButton'
import { LoginRequestData } from '@/types/AuthTypes'
import styles from './LoginPage.module.scss'

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
        message.success('Вы успешно авторизовались')
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
        data-testid='login-form'
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
          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles.formButton}>
              Войти
            </Button>
          </Form.Item>

          <Divider plain>или</Divider>

          <Form.Item>
            <OAuthButton />
          </Form.Item>

          <Form.Item>
            <NavLink to={routes.registration.path}>
              <Button type='link' className={styles.formButton}>
                Зарегистрироваться
              </Button>
            </NavLink>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
