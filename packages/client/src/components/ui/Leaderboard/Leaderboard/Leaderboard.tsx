import { Table, Tag, Avatar, Spin } from 'antd'
import type { TableProps } from 'antd'
import { routes } from '@/routing/routes'
import { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getLeaderboardData } from '@/store/slices/leaderboard/leaderboardSelector'
import { PAGE_SIZE, RANG_COLOR_MAP } from '@/constants/leaderboard'
import { SERVER_HOST } from '@/constants/serverHost'
import { LeaderboardData } from '@/types/leaderboard'
import styles from './Leaderboard.module.scss'

const columns: TableProps<LeaderboardData>['columns'] = [
  {
    title: 'Позиция',
    dataIndex: 'position',
    key: 'position',
    width: 100,
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.position - b.position,
    showSorterTooltip: false,
  },
  {
    title: 'Аватар',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 100,
    render: (_, { avatar }) => <Avatar src={`${SERVER_HOST}/yandex/resources${avatar}`} />,
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
    showSorterTooltip: false,
  },
  {
    title: 'Волны',
    dataIndex: 'waves',
    key: 'waves',
    sorter: (a, b) => a.position - b.position,
    showSorterTooltip: false,
  },
  {
    title: 'Убийства',
    dataIndex: 'kills',
    key: 'kills',
    sorter: (a, b) => a.position - b.position,
    showSorterTooltip: false,
  },
  {
    title: 'Ранг',
    key: 'rang',
    dataIndex: 'rang',
    sorter: (a, b) => (a.rang > b.rang ? 1 : -1),
    showSorterTooltip: false,
    render: (_, { rang }) => (
      <Tag color={RANG_COLOR_MAP.get(rang)} key={rang}>
        {rang.toUpperCase()}
      </Tag>
    ),
  },
]

export const Leaderboard: FC = () => {
  const leaderboardRows = useAppSelector(state => getLeaderboardData(state))

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (page * PAGE_SIZE < (leaderboardRows?.length || 0)) {
      setPage(page)
    }
  }, [leaderboardRows, page])

  if (!leaderboardRows) {
    return <Spin fullscreen size='large' />
  }
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.leaderboard.title}</title>
      </Helmet>
      <Table
        className={styles.leaderboard}
        dataSource={leaderboardRows}
        columns={columns}
        pagination={{
          pageSize: PAGE_SIZE,
          hideOnSinglePage: true,
          current: page,
          onChange: setPage,
        }}
      />
    </>
  )
}
