import { Button, Flex, Input, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
const { Title } = Typography

export const GamePage = () => {
  return (
    <>
      <Helmet>
        <title>Game</title>
      </Helmet>
      <Title level={1}>GamePage</Title>
      <Flex gap={20}>
        <Button>some buttton</Button>
        <Input placeholder="Basic usage" />
      </Flex>
    </>
  )
}
