import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { message } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import oAuthService from '@/utils/oAuthService'
import { router } from '@/routing/router'
import { fetchCurrentUser } from './store/slices/auth/authSlice'
import { useAppDispatch } from './hooks/reduxHooks'
import { useInternetConnectionMessage } from './hooks/useInternetConnectionMessage'

const App = () => {
  const { i18n } = useTranslation()
  dayjs.locale(i18n.language)

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

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

export default App
