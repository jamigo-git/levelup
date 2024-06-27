import { Button, Flex, Layout, theme } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import { logout } from '@/store/slices/auth/authSlice'
import { getIsAuth } from '@/store/slices/auth/authSelector'
import { routes } from '@/routing/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { Logo } from '@/components/ui/Logo'
import styles from './MainLayout.module.scss'

const { Header, Content } = Layout

export const MainLayout = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken()

  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Layout className={styles.page}>
      <div className={styles.background} />
      <Header className={styles.header}>
        <Flex align="center" gap={20} className={styles.header__content}>
          <NavLink to={routes.root.path}>
            <Logo fillColor={colorPrimary} />
          </NavLink>
          <NavLink to={routes.profile.path}>Профиль</NavLink>
          <NavLink to={routes.game.path}>Игра</NavLink>
          <NavLink to={routes.forum.path}>Форум</NavLink>
          {isAuth && (
            <Button
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ marginLeft: 'auto' }}
            />
          )}
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
