import { Button, Flex, Input, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { routes } from '@/routing/routes'

const { Title } = Typography

export const GamePage = () => {
  return (
    <>
      <Helmet>
        <title>LVL UP | {routes.game.title}</title>
      </Helmet>
      <Title level={1}>GamePage</Title>
      <Flex gap={20}>
        <Button>some buttton</Button>
        <Input placeholder='Basic usage' />
      </Flex>
    </>
  )
}
