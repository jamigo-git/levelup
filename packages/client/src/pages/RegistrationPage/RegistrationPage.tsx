import { Button, Typography, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import { Helmet } from 'react-helmet-async'
import { login } from '@/store/slices/auth/authSlice'
import { routes } from '@/routing/routes'
import { useAppDispatch } from '@/hooks/reduxHooks'
// import { getIsAuth } from '@/store/slices/auth/authSelector'
import { NavLink } from 'react-router-dom'
import * as Validation from '@/utils/validation'
import { Rule } from 'antd/es/form'
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

/** Валидации для поля Имя */
const firstNameRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите имя!',
  },
  () => ({
    validator(_, value) {
      if (Validation.name(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Имя не соответствует требованиям'))
    },
  }),
]

/** Валидации для поля Фамилия */
const secondNameRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите Фамилию!',
  },
  () => ({
    validator(_, value) {
      if (Validation.name(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Фамилия не соответствует требованиям'))
    },
  }),
]

/** Валидации для поля Email */
const emailRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите Email!',
  },
  () => ({
    validator(_, value) {
      if (Validation.email(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Email не соответствует требованиям'))
    },
  }),
]

/** Валидации для поля Телефон */
const phoneRules: Rule[] = [
  {
    required: true,
    message: 'Пожалуйста введите телефон!',
  },
  () => ({
    validator(_, value) {
      if (Validation.phone(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Телефон не соответствует требованиям'))
    },
  }),
]

/** Валидации для поля логин */
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

/** Валидации для поля пароль */
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

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.error('Failed:', errorInfo)
}

export const RegistrationPage = () => {
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <div className={styles.modalHeader}>
          <Title level={2}>Регистрация</Title>
        </div>
        <Form.Item<FieldType> label='Имя' name='name' validateFirst rules={firstNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label='Фамилия' name='secondName' validateFirst rules={secondNameRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label='Email' name='email' validateFirst rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label='Телефон' name='phone' validateFirst rules={phoneRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label='Login' name='username' validateFirst rules={loginRules}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label='Password' name='password' validateFirst rules={passwordRules}>
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
