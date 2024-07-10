import { Table, Tag, Avatar } from 'antd'
import type { TableProps } from 'antd'
import { routes } from '@/routing/routes'
import { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getLeaderboardData } from '@/store/slices/leaderboard/leaderboardSelector'
import { Rang, TableData } from '@/types/leaderboard'
import styles from './Leaderboard.module.scss'

const rangColorMap: Map<Rang, string> = new Map([
  ['Kid', 'red'],
  ['Bro', 'green'],
  ['Master', 'geekblue'],
  ['Pro', 'vocano'],
  ['God', 'orange'],
])

const PAGE_SIZE = 10

const columns: TableProps<TableData>['columns'] = [
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
    render: (_, { avatar }) => <Avatar src={avatar} />,
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
      <Tag color={rangColorMap.get(rang)} key={rang}>
        {rang.toUpperCase()}
      </Tag>
    ),
  },
]

export const Leaderboard: FC = () => {
  const [page, setPage] = useState(1)
  const leaderboard = useAppSelector(state => getLeaderboardData(state))

  useEffect(() => {
    if (leaderboard?.length && page * PAGE_SIZE < leaderboard.length) {
      setPage(page)
    }
  }, [leaderboard?.length, page])

  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.leaderboard.title}</title>
      </Helmet>
      <Table
        className={styles.leaderboard}
        dataSource={leaderboard}
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
