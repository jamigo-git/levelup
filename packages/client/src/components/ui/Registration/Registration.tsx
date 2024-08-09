import { Button, Typography, Form, Input, message } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { fetchCurrentUser, register } from '@/store/slices/auth/authSlice'
import { NavLink } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { emailRules, phoneRules, firstNameRules, secondNameRules, passwordRules, loginRules } from '@/utils/validation'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { useTranslation } from 'react-i18next'
import styles from './RegistrationPage.module.scss'
import { CreateUser } from '@/types/AuthTypes'

const { Title } = Typography

export const Registration: React.FC = () => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onFinishFailed: FormProps<CreateUser>['onFinishFailed'] = errorInfo => {
    message.error(`${t('Registration.errorMessage')}: ${errorInfo.errorFields[0].errors[0]}`)
  }

  const onFinish: FormProps<CreateUser>['onFinish'] = values => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        message.success(t('Registration.successMessage'))
        dispatch(fetchCurrentUser())
      })
      .catch(error => {
        message.error(`${t('Registration.errorMessage')}: ${error}`)
      })
  }

  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.registration.title}</title>
      </Helmet>
      <Form
        form={form}
        className={styles.registrationForm}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'>
        <div className={styles.modalHeader}>
          <Title level={2}>{t('Registration.title')}</Title>
        </div>

        <Form.Item<CreateUser>
          label={t('Registration.firstNameLabel')}
          name='first_name'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={firstNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label={t('Registration.lastNameLabel')}
          name='second_name'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={secondNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label={t('Registration.emailLabel')}
          name='email'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label={t('Registration.phoneLabel')}
          name='phone'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={phoneRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label={t('Registration.loginLabel')}
          name='login'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={loginRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label={t('Registration.passwordLabel')}
          name='password'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={passwordRules}>
          <Input.Password />
        </Form.Item>

        <div className={styles.modalFooter}>
          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles.formBotton}>
              {t('Registration.registrationButtonText')}
            </Button>
          </Form.Item>

          <Form.Item>
            <NavLink to={routes.login.path}>
              <Button type='link' className={styles.formBotton}>
                {t('Registration.loginButtonText')}
              </Button>
            </NavLink>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
