import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Profile } from '@/components/ui/Profile/Profile'

export const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>{routes.profile.title}</title>
        <meta name='description' content={routes.profile.description} />
      </Helmet>
      <Profile />
    </>
  )
}
