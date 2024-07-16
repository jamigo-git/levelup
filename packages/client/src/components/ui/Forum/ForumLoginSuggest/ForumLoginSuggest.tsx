import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/routing/routes'

export const ForumLoginSuggest: FC = () => {
  const navigate = useNavigate()

  const handleNavigateButtonCLick = () => {
    navigate(routes.login.path)
  }

  return (
    <Flex gap={4} align='baseline'>
      <Button
        type='primary'
        onClick={handleNavigateButtonCLick}
        aria-label='Авторизируйтесь, чтобы создавать топики и отвечать на сообщения'>
        Авторизируйтесь
      </Button>
      <Typography.Text>, чтобы создавать топики и отвечать на сообщения</Typography.Text>
    </Flex>
  )
}
