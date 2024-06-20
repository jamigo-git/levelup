import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routing/router'
import { store } from './store'
import { HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  )
}

export default App
