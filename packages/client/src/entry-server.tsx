import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import dayjs from 'dayjs'
import App from './App'
import 'antd/dist/reset.css'
import './styles/index.scss'
import 'dayjs/locale/ru'
import { store } from './store'

dayjs.locale('ru')

export const render = () =>
  renderToString(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
