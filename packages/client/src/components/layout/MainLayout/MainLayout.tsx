import { Button, Flex, Layout, theme } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { routes } from '@/routing/routes'
import { logout } from '@/store/slices/auth/authSlice'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { Logo } from '@/components/ui/Logo'
import styles from './MainLayout.module.scss'

const { Header, Content } = Layout

export const MainLayout = () => {
  const {
    token: { colorPrimaryBg, colorPrimary },
  } = theme.useToken()

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Layout className={styles.page}>
      <div className={styles.background} />
      <Header className={styles.header} style={{ background: colorPrimaryBg }}>
        <Flex align='center' gap={20}>
          <NavLink to={routes.root.path}>
            <Logo fillColor={colorPrimary} />
          </NavLink>
          <NavLink to={routes.profile.path}>profile</NavLink>
          <NavLink to={routes.game.path}>game</NavLink>
          <Button icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginLeft: 'auto' }} />
        </Flex>
      </Header>
      <Content className={styles.content}>
        <div className={styles.content__wrapper}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}
