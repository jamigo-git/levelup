import { Table, Tag, Avatar } from 'antd'
import type { TableProps } from 'antd'
import { routes } from '@/routing/routes'
import { FC } from 'react'
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

const columns: TableProps<TableData>['columns'] = [
  {
    title: 'Позиция',
    dataIndex: 'position',
    key: 'position',
    width: 100,
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.position - b.position,
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
    render: text => <div>{text}</div>,
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
  },
  {
    title: 'Волны',
    dataIndex: 'waves',
    key: 'waves',
    sorter: (a, b) => a.position - b.position,
  },
  {
    title: 'Убийства',
    dataIndex: 'kills',
    key: 'kills',
    sorter: (a, b) => a.position - b.position,
  },
  {
    title: 'Ранг',
    key: 'rang',
    dataIndex: 'rang',
    sorter: true,
    render: (_, { rang }) => (
      <Tag color={rangColorMap.get(rang)} key={rang}>
        {rang.toUpperCase()}
      </Tag>
    ),
  },
]

export const Leaderboard: FC = () => {
  const leaderboard = useAppSelector(state => getLeaderboardData(state))

  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.leaderboard.title}</title>
      </Helmet>
      <Table className={styles.leaderboard} dataSource={leaderboard} columns={columns} />
    </>
  )
}
