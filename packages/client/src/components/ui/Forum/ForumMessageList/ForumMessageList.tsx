import { FC, useState } from 'react'
import { List } from 'antd'
import { useTranslation } from 'react-i18next'
import { useGetCommentListQuery } from '@/store/slices/forumApi'

import { Comment } from '@/types/forum'
import { CommentComponent } from './CommentComponent'
import styles from './ForumMessageList.module.scss'

const PAGE_SIZE = 10
interface ForumMessageListProps {
  topic: {
    id: number
    title: string
  }
  onCommentReply: (comment: Comment) => void
}
export const ForumMessageList: FC<ForumMessageListProps> = ({ topic, onCommentReply }) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetCommentListQuery({
    topicId: topic.id,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  })

  return (
    <List
      className={styles.list}
      dataSource={data?.list}
      loading={isLoading}
      pagination={{
        total: data?.total,
        pageSize: PAGE_SIZE,
        hideOnSinglePage: true,
        current: page,
        onChange: setPage,
      }}
      locale={{ emptyText: `${t('ForumMessageList.emptyText')}` }}
      renderItem={(comment: Comment) => <CommentComponent comment={comment} onReplyClick={onCommentReply} />}
    />
  )
}
