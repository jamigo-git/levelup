import { Button, Flex, Space, theme, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { routes } from '@/routing/routes'
import styles from './HomePage.module.scss'

const { Text, Paragraph } = Typography

export const HomePage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken()

  return (
    <>
      <Helmet>
        <title>{routes.root.title}</title>
        <meta name='description' content={routes.root.description} />
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
              LevelUp — это игра, в которой игрок строит и размещает различные защитные башни на карте с целью
              предотвратить прохождение врагов через определённый маршрут.
              <br />
              <br />
              Враги движутся по предопределённым путям, и башни автоматически атакуют их. Игрок может улучшать башни и
              стратегически размещать их для максимальной эффективности.
              <br />
              <br />
              Основная цель — защитить базу от волн наступающих противников.
            </Paragraph>
          </Flex>

          <NavLink to={routes.game.path}>
            <Button size='large' type='primary'>
              Игра
            </Button>
          </NavLink>
        </Space>
      </Flex>
    </>
  )
}
