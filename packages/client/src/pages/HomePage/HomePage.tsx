import { Button, Flex, Space, theme, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { routes } from '@/routing/routes'
import { useTranslation } from 'react-i18next'
import styles from './HomePage.module.scss'

const { Text, Paragraph } = Typography

export const HomePage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken()
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>LVL UP!</title>
      </Helmet>
      <Flex align='center' className={styles.homePage} data-testid='HomePage'>
        <Space direction='vertical' align='center' size={80}>
          <Flex align='center'>
            <Logo fillColor={colorPrimary} shadow size='120' />
            <Text strong className={styles.homePage__header_title}>
              LevelUp!
            </Text>
          </Flex>

          <Flex align='center' className={styles.homePage__body}>
            <Paragraph className={styles.homePage__body_paragraph}>
              {t('HomePage.firstText')}
              <br />
              <br />
              {t('HomePage.secondText')}
              <br />
              <br />
              {t('HomePage.thirdText')}
            </Paragraph>
          </Flex>

          <NavLink to={routes.game.path}>
            <Button size='large' type='primary'>
              {t('HomePage.buttonText')}
            </Button>
          </NavLink>
        </Space>
      </Flex>
    </>
  )
}
