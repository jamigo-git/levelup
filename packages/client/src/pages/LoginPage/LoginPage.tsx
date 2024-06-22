import { Button, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { login } from '@/store/slices/auth/authSlice'
import { routes } from '@/routing/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getIsAuth } from '@/store/slices/auth/authSelector'

const { Title } = Typography

export const LoginPage = () => {
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
      <Title level={1}>LoginPage</Title>
      <Typography>logged in: {isAuth.toString()}</Typography>
      <Button type='primary' onClick={fakeLogin}>
        login
      </Button>
    </>
  )
}
