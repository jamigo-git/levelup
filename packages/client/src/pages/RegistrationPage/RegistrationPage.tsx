import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Registration } from '@/components/ui/Registration'

export const RegistrationPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>{routes.registration.title}</title>
        <meta name='description' content={routes.registration.description} />
      </Helmet>
      <Registration />
    </>
  )
}
