import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Topic } from 'types/forum'
import { List, Avatar } from 'antd'

import { useGetTopicListQuery } from '@/store/slices/forumApi'
import { API_HOST } from '@/constants/serverHost'
import { getTopicDescription } from './helpers'
import styles from './ForumTopicList.module.scss'

const PAGE_SIZE = 5

export const ForumTopicList = () => {
  const { t } = useTranslation()
  const messagei18nString = t('GetTopicDescription.message')

  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTopicListQuery({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE })

  return (
    <div className={styles.forumTopics}>
      <List
        loading={isLoading}
        dataSource={data?.list}
        pagination={{
          total: data?.total,
          pageSize: PAGE_SIZE,
          hideOnSinglePage: true,
          onChange: setPage,
        }}
        className={styles.list}
        renderItem={(topic: Topic) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`${API_HOST}/yandex/resources${topic.user.avatar}`} />}
              title={<Link to={`/forum/topic/${topic.id}`}>{topic.title}</Link>}
              description={getTopicDescription(topic, messagei18nString)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
