import { Flex, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'
import { ForumTopicList } from '@/components/ui/Forum/ForumTopicList'
import { ForumAddTopic } from '@/components/ui/Forum/ForumAddTopic'

const { Title } = Typography

export const ForumPage = () => {
  return (
    <>
      <Helmet>
        <title>{routes.forum.title}</title>
        <meta name='description' content={routes.forum.description} />
      </Helmet>
      <Title level={1}>Форум</Title>
      <Flex vertical gap={24}>
        <ForumTopicList />
        <ForumAddTopic />
      </Flex>
    </>
  )
}
