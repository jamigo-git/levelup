import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { useTranslation } from 'react-i18next'

export const ForumLoginSuggest: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleNavigateButtonCLick = () => {
    navigate(routes.login.path)
  }

  return (
    <Flex gap={4} align='baseline'>
      <Button type='primary' onClick={handleNavigateButtonCLick} aria-label={t('ForumLoginSuggest.buttonText')}>
        Авторизируйтесь
      </Button>
      <Typography.Text>{t('ForumLoginSuggest.explanation')}</Typography.Text>
    </Flex>
  )
}
