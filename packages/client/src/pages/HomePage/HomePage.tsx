import { Button, Flex, Space, theme, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import styles from './HomePage.module.scss'

const { Title, Text, Paragraph } = Typography

export const HomePage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken()

  return (
    <>
      <Helmet>
        <title>LVL UP!</title>
      </Helmet>
      <Title level={1}>HomePage</Title>
      <Flex align='center' className={styles.homePage}>
        <Space direction='vertical' align='center' size={80}>
          <Flex align='center'>
            <Logo fillColor={colorPrimary} size='120' />
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

          <Link to='game'>
            <Button size='large' type='primary'>
              Игра
            </Button>
          </Link>
        </Space>
      </Flex>
    </>
  )
}
