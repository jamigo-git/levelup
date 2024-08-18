import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { Flex, Typography } from 'antd'
import { useAppSelector } from '@/hooks/reduxHooks'
import { selectTopicById } from '@/store/slices/forumTopic/forumTopicSelector'
import { ForumMessageList } from '@/components/ui/Forum/ForumMessageList'
import { ForumMessageForm } from '@/components/ui/Forum/ForumMessageForm'
import CustomError from '@/utils/customError'
import { useTranslation } from 'react-i18next'
import { routes } from '@/routing/routes'
import styles from './ForumTopicPage.module.scss'

const { Title } = Typography

export const ForumTopicPage = () => {
  const { id } = useParams()
  const topic = useAppSelector(state => selectTopicById(state, id))
  const { t } = useTranslation()

  if (!id || !topic) {
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
        <ForumMessageList topicId={id} />
        <div className={styles.forumTopicPageContent__formWrapper}>
          <ForumMessageForm topicId={id} />
        </div>
      </Flex>
    </>
  )
}
