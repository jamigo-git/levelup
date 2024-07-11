import { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from '@/routing/router'
import { customTheme } from './styles/antdConfig'
import { fetchCurrentUser } from './store/slices/auth/authSlice'
import { useAppDispatch } from './hooks/reduxHooks'
import { useInternetConnectionMessage } from './hooks/useInternetConnectionMessage'

const App = () => {
  useInternetConnectionMessage()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <HelmetProvider>
      <ConfigProvider theme={customTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </HelmetProvider>
  )
}

export default App
