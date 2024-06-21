import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { getIsAuth } from '@/slices/auth/authSelector'
import { useAppSelector } from '@/hooks/reduxHooks'

export const PrivatePageHOC: FC<{ children?: React.ReactElement }> = ({ children }) => {
  const isAuth = useAppSelector(getIsAuth)
  if (!isAuth) {
    return <Navigate to={routes.login.path} />
  }
  return children || <Outlet />
}
