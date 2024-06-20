import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
const { Title } = Typography

export const HomePage = () => {
  return (
    <>
      <Title level={1}>HomePage</Title>
      <Space>
        <Link to="profile">Profile</Link>
        <Link to="game">Game</Link>
      </Space>
    </>
  )
}
