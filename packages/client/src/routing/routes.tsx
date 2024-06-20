import { PlaySquareOutlined, UserOutlined } from '@ant-design/icons'

export const routes = {
  root: {
    path: '/',
  },
  profile: {
    path: '/profile',
    title: 'Profile',
    icon: <UserOutlined />,
  },
  game: {
    path: '/game',
    title: 'Game',
    icon: <PlaySquareOutlined />,
  },
} as const
