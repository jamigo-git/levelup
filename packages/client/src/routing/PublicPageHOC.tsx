import { FC } from 'react'
import { Spin } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { getIsAuth, getIsAuthenticating } from '@/slices/auth/authSelector'
import { useAppSelector } from '@/hooks/reduxHooks'

export const PublicPageHOC: FC<{ children?: React.ReactElement }> = ({ children }) => {
  const isAuth = useAppSelector(getIsAuth)
  const isAuthenticating = useAppSelector(getIsAuthenticating)

  if (isAuthenticating) {
    return (
      <>
        <Spin fullscreen size='large' />
        {children}
      </>
    )
  }

  if (isAuth) {
    return <Navigate to={routes.game.path} />
  }
  return children || <Outlet />
}
