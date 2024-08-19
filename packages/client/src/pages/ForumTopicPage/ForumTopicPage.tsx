import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { Flex, Spin, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import CustomError from '@/utils/customError'
import { ForumMessageList } from '@/components/ui/Forum/ForumMessageList'
import { ForumMessageForm } from '@/components/ui/Forum/ForumMessageForm'
import { routes } from '@/routing/routes'
import { useGetTopicByIdQuery } from '@/store/slices/forumApi'
import { Comment } from '@/types/forum'
import styles from './ForumTopicPage.module.scss'

const { Title } = Typography

export const ForumTopicPage = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const [commentToReply, setCommentToReply] = useState<Comment>()
  const { data: topic, isLoading } = useGetTopicByIdQuery({ topicId: id })

  const handleCommentReplyClick = (comment: Comment) => {
    setCommentToReply(comment)
  }

  const onSuccessfulComment = () => {
    setCommentToReply(undefined)
  }

  if (isLoading) {
    return <Spin />
  }

  if (!topic) {
    throw new CustomError(`${t('ForumTopicPage.error')}`, 404)
  }

  return (
    <>
      <Helmet>
        <title>
          {routes.forumTopic.title} {id}
        </title>
        <meta name='description' content={routes.forumTopic.description} />
      </Helmet>
      <Flex vertical className={styles.forumTopicPageContent}>
        <Title level={1}>
          {t('ForumTopicPage.topicTitle')}: {topic.title}
        </Title>
        <ForumMessageList topic={topic} onCommentReply={handleCommentReplyClick} />
        <div className={styles.forumTopicPageContent__formWrapper}>
          <ForumMessageForm topicId={topic.id} commentToReply={commentToReply} onReply={onSuccessfulComment} />
        </div>
      </Flex>
    </>
  )
}
