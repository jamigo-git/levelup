import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { hydrateRoot } from 'react-dom/client'
import dayjs from 'dayjs'
import App from './App'
import 'antd/dist/reset.css'
import './styles/index.scss'
import 'dayjs/locale/ru'
import { store } from './store'

dayjs.locale('ru')

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
