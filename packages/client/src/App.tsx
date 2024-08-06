import { useEffect } from 'react'
import { ConfigProvider, message } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import oAuthService from '@/utils/oAuthService'
import { router } from '@/routing/router'
import { customTheme } from './styles/antdConfig'
import { fetchCurrentUser } from './store/slices/auth/authSlice'
import { useAppDispatch } from './hooks/reduxHooks'
import { useInternetConnectionMessage } from './hooks/useInternetConnectionMessage'

const App = () => {
  useInternetConnectionMessage()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const oAuthLoginAttempt = async () => {
      const result = await oAuthService.loginOAuth()
      if (result?.error) {
        message.error(`OAuth Login error: ${result.error}`)
        return
      }

      dispatch(fetchCurrentUser())
    }

    oAuthLoginAttempt()
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
