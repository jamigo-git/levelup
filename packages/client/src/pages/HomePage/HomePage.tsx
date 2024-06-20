import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
      <Typography>Home page</Typography>
      <Space>
        <Link to="profile">Profile</Link>
        <Link to="game">Game</Link>
      </Space>
    </>
  )
}
