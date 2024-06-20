import { Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
const { Title } = Typography

export const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Профаил</title>
      </Helmet>
      <Title level={1}>ProfilePage</Title>
    </>
  )
}
