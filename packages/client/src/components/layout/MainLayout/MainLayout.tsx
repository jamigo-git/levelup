import { Layout, Space } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { routes } from '@/routing/routes'

const { Header, Footer, Content } = Layout

export const MainLayout = () => {
  return (
    <Layout className={styles.page}>
      <Header className={styles.header}>
        <Space>
          <NavLink to={routes.root.path}>home</NavLink>
          <NavLink to={routes.profile.path}>profile</NavLink>
          <NavLink to={routes.game.path}>game</NavLink>
          some header
        </Space>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>some footer</Footer>
    </Layout>
  )
}
