import { Space, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const { Title } = Typography

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP!</title>
      </Helmet>
      <Title level={1}>HomePage</Title>
      <Space>
        <Link to='profile'>Profile</Link>
        <Link to='game'>Game</Link>
      </Space>
    </>
  )
}
