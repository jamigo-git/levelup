import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Registration } from '@/components/ui/Registration'

export const RegistrationPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.registration.title}</title>
      </Helmet>
      <Registration />
    </>
  )
}
