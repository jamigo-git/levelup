import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Login } from '@/components/ui/Login'

export const LoginPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.login.title}</title>
      </Helmet>
      <Login />
    </>
  )
}
