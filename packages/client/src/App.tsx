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
import { leaderboardTeamReq } from './store/slices/leaderboard/leaderboardSlice'
import { CURSOR, LIMIT, RATING_FIELD_NAME } from './constants/leaderboard'

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
      dispatch(leaderboardTeamReq({ ratingFieldName: RATING_FIELD_NAME, cursor: CURSOR, limit: LIMIT }))
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
