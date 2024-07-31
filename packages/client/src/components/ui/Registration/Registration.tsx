import { Button, Typography, Form, Input, message } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { fetchCurrentUser, register } from '@/store/slices/auth/authSlice'
import { NavLink } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { emailRules, phoneRules, firstNameRules, secondNameRules, passwordRules, loginRules } from '@/utils/validation'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { CreateUser } from '@/types/AuthTypes'
import styles from './RegistrationPage.module.scss'

const { Title } = Typography

const onFinishFailed: FormProps<CreateUser>['onFinishFailed'] = errorInfo => {
  message.error(`Register error: ${errorInfo.errorFields[0].errors[0]}`)
}

export const Registration: React.FC = () => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const onFinish: FormProps<CreateUser>['onFinish'] = values => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        message.success('Вы успешно зарегистрировались')
        dispatch(fetchCurrentUser())
      })
      .catch(error => {
        message.error(`Registration error: ${error}`)
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
          <Title level={2}>Регистрация</Title>
        </div>

        <Form.Item<CreateUser>
          label='Имя'
          name='first_name'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={firstNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label='Фамилия'
          name='second_name'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={secondNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label='Email'
          name='email'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label='Телефон'
          name='phone'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={phoneRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label='Login'
          name='login'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={loginRules}>
          <Input />
        </Form.Item>

        <Form.Item<CreateUser>
          label='Password'
          name='password'
          validateFirst
          hasFeedback
          validateTrigger='onChange'
          rules={passwordRules}>
          <Input.Password />
        </Form.Item>

        <div className={styles.modalFooter}>
          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles.formButton}>
              Зарегистрироваться
            </Button>
          </Form.Item>

          <Form.Item>
            <NavLink to={routes.login.path}>
              <Button type='link' className={styles.formButton}>
                Войти
              </Button>
            </NavLink>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
