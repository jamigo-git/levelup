import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Login } from '@/components/ui/Login'

export const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.login.title}</title>
      </Helmet>
      <Login />
    </>
  )
}
