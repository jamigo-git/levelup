import { Layout, Space, theme } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { Logo } from '@/components/ui/Logo'
import styles from './MainLayout.module.scss'

const { Header, Content } = Layout

export const MainLayout = () => {
  const {
    token: { colorPrimaryBg, colorPrimary },
  } = theme.useToken()

  return (
    <Layout className={styles.page}>
      <div className={styles.background} />
      <Header className={styles.header} style={{ background: colorPrimaryBg }}>
        <Space>
          <NavLink to={routes.root.path}>
            <Logo fillColor={colorPrimary} />
          </NavLink>
          <NavLink to={routes.profile.path}>profile</NavLink>
          <NavLink to={routes.game.path}>game</NavLink>
        </Space>
      </Header>
      <Content className={styles.content}>
        <div className={styles.content__wrapper}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}
