import { FC } from 'react'
import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { useTranslation } from 'react-i18next'

export const ForumLoginSuggest: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Typography.Text>
      <Button type='primary' onClick={() => navigate(routes.login.path)}>
        {t('ForumLoginSuggest.buttonText')}
      </Button>{' '}
      {t('ForumLoginSuggest.explanation')}
    </Typography.Text>
  )
}
