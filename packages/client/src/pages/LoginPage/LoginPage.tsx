import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Login } from '@/components/ui/Login'

export const LoginPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>{routes.login.title}</title>
        <meta name='description' content={routes.login.description} />
      </Helmet>
      <Login />
    </>
  )
}
