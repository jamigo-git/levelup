import { FC } from 'react'
import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/routing/routes'

export const ForumLoginSuggest: FC = () => {
  const navigate = useNavigate()

  return (
    <Typography.Text>
      <Button type='primary' onClick={() => navigate(routes.login.path)}>
        Авторизируйтесь
      </Button>{' '}
      , чтобы создавать топики и отвечать на сообщения
    </Typography.Text>
  )
}
