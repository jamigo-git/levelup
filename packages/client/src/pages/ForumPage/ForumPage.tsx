import { Flex, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { ForumTopicList } from '@/components/ui/Forum/ForumTopicList'
import { ForumAddTopic } from '@/components/ui/Forum/ForumAddTopic'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

export const ForumPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.forum.title}</title>
      </Helmet>
      <Title level={1}>{t('ForumPage.Title')}</Title>
      <Flex vertical gap={24}>
        <ForumTopicList />
        <ForumAddTopic />
      </Flex>
    </>
  )
}
