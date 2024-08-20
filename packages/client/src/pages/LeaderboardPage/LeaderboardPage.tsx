import { Typography } from 'antd'
import { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { Leaderboard } from '@/components/ui/Leaderboard/Leaderboard'
import { leaderboardTeamReq } from '@/store/slices/leaderboard/leaderboardSlice'
import { CURSOR, LIMIT, RATING_FIELD_NAME } from '@/constants/leaderboard'
import { useAppDispatch } from '@/hooks/reduxHooks'

const { Title } = Typography

export const LeaderboardPage: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(leaderboardTeamReq({ ratingFieldName: RATING_FIELD_NAME, cursor: CURSOR, limit: LIMIT }))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>{routes.leaderboard.title}</title>
        <meta name='description' content={routes.leaderboard.description} />
      </Helmet>
      <Title level={1}>Лучшие игроки</Title>
      <Leaderboard />
    </>
  )
}
