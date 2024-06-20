import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from '@/routing/router'
import { store } from './store'
import { customTheme } from './styles/antdConfig'

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ConfigProvider theme={customTheme}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </Provider>
    </HelmetProvider>
  )
}

export default App
