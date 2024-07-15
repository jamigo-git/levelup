import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Profile } from '@/components/ui/Profile/Profile'

export const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.profile.title}</title>
      </Helmet>
      <Profile />
    </>
  )
}
