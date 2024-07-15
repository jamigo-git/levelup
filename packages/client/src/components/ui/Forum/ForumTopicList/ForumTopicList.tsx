import { Link } from 'react-router-dom'
import { Topic } from 'types/forum'
import { List, Avatar } from 'antd'
import { useAppSelector } from '@/hooks/reduxHooks'
import { selectTopicList } from '@/store/slices/forumTopic/forumTopicSelector'
import { getTopicDescription } from './helpers'
import styles from './ForumTopicList.module.scss'

export const ForumTopicList = () => {
  const topicList = useAppSelector(selectTopicList)

  return (
    <div className={styles.forumTopics}>
      <List
        dataSource={topicList}
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
        }}
        className={styles.list}
        renderItem={(topic: Topic) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={topic.author.avatar} />}
              title={<Link to={`/forum/topic/${topic.id}`}>{topic.title}</Link>}
              description={getTopicDescription(topic)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
