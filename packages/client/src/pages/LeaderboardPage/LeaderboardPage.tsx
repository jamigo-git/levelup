import { Typography } from 'antd'
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Leaderboard } from '@/components/ui/Leaderboard/Leaderboard'

const { Title } = Typography

export const LeaderboardPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.leaderboard.title}</title>
      </Helmet>
      <Title level={1}>Лучшие игроки</Title>
      <Leaderboard />
    </>
  )
}
