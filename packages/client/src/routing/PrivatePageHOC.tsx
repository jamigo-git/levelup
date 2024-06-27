import { FC } from 'react'
import { Spin } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import { getIsAuth, getIsAuthenticating } from '@/slices/auth/authSelector'
import { routes } from '@/routing/routes'
import { useAppSelector } from '@/hooks/reduxHooks'

export const PrivatePageHOC: FC<{ children?: React.ReactElement }> = ({ children }) => {
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

  if (!isAuth) {
    return <Navigate to={routes.login.path} />
  }
  return children || <Outlet />
}
