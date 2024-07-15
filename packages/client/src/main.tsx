import React from 'react'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import App from './App'
import 'antd/dist/reset.css'
import './styles/index.scss'
import 'dayjs/locale/ru'
import { store } from './store'

dayjs.locale('ru')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
