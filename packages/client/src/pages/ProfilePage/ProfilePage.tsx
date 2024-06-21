import { Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
const { Title } = Typography

export const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.profile.title}</title>
      </Helmet>
      <Title level={1}>ProfilePage</Title>
    </>
  )
}
