import { Button, Typography, Form, Input, message, Divider } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { fetchCurrentUser, login } from '@/store/slices/auth/authSlice'
import { NavLink } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { passwordRules, loginRules } from '@/utils/validation'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { useTranslation } from 'react-i18next'
import { OAuthButton } from '@/components/ui/common/OAuthButton'
import { LoginRequestData } from '@/types/AuthTypes'
import styles from './LoginPage.module.scss'

const { Title } = Typography

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onFinishFailed: FormProps<LoginRequestData>['onFinishFailed'] = errorInfo => {
    message.error(`${t('Login.errorMessage')}: ${errorInfo.errorFields[0].errors[0]}`)
  }

  const onFinish: FormProps<LoginRequestData>['onFinish'] = values => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        message.success(t('Login.successMessage'))
        dispatch(fetchCurrentUser())
      })
      .catch(error => {
        message.error(`${t('Login.errorMessage')}: ${error}`)
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
          <Title level={2}>{t('Login.title')}</Title>
        </div>

        <Form.Item<LoginRequestData>
          label={t('Login.loginLabel') as unknown as string} // Приведение типа к строке через unknown
          name='login'
          validateFirst
          rules={loginRules}
          hasFeedback
          validateTrigger='onChange'>
          <Input />
        </Form.Item>

        <Form.Item<LoginRequestData>
          label={t('Login.passwordLabel')}
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
              {t('Login.loginButtonText')}
            </Button>
          </Form.Item>

          <Divider plain>или</Divider>

          <Form.Item>
            <OAuthButton />
          </Form.Item>

          <Form.Item>
            <NavLink to={routes.registration.path}>
              <Button type='link' className={styles.formButton}>
                {t('Login.registrationButtonText')}
              </Button>
            </NavLink>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
