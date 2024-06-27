import { useEffect } from 'react'
<<<<<<< HEAD
import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App">Вот тут будет жить ваше приложение :)</div>
=======
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from '@/routing/router'
import { customTheme } from './styles/antdConfig'
import { fetchCurrentUser } from './store/slices/auth/authSlice'
import { useAppDispatch } from './hooks/reduxHooks'

const App = () => {
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
>>>>>>> 60768d0 (LVL-36: Реализовать логику авторизации)
}

export default App
