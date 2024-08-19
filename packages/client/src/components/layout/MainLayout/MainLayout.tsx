import { Button, ConfigProvider, Flex, Layout } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import { LogoutOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { logout } from '@/store/slices/auth/authSlice'
import { getIsAuth } from '@/store/slices/auth/authSelector'
import { routes } from '@/routing/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { Logo } from '@/components/ui/Logo'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MainLayout.module.scss'
import { darkTheme, lightTheme } from '../../../styles/antdConfig'

const { Header, Content } = Layout

export const MainLayout: FC<{ children?: React.ReactElement }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const currentTheme = isDarkMode ? darkTheme : lightTheme

  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  const { t, i18n } = useTranslation()

  const languageToggle = (language: string): string => (language === 'ru' ? 'en' : 'ru')

  const changeLanguage = () => {
    i18n.changeLanguage(languageToggle(i18n.language))
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  const {
    token: { colorPrimary },
  } = currentTheme
  return (
    <ConfigProvider theme={currentTheme}>
      <Layout className={styles.page}>
        <div className={`${styles.background} ${isDarkMode ? styles.background_dark : styles.background_light}`} />
        <Header className={styles.header}>
          <Flex align='center' gap={20} className={styles.header__content}>
            <NavLink to={routes.root.path}>
              <Logo fillColor={colorPrimary} size='24' />
            </NavLink>
            <NavLink to={routes.profile.path}>{t('MainLayout.profileLink')}</NavLink>
            <NavLink to={routes.game.path}>{t('MainLayout.gameLink')}</NavLink>
            <NavLink to={routes.forum.path}>{t('MainLayout.forumLink')}</NavLink>
            <NavLink to={routes.leaderboard.path}>{t('MainLayout.leaderboardLink')}</NavLink>
            <Button onClick={() => changeLanguage()}>{languageToggle(i18n.language)}</Button>
            <Button onClick={toggleTheme}>{isDarkMode ? <SunOutlined /> : <MoonOutlined />}</Button>
            {isAuth && <Button icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginLeft: 'auto' }} />}
          </Flex>
        </Header>
        <Content className={styles.content}>
          <div className={styles.content__wrapper}>{children || <Outlet />}</div>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}
