import React from 'react'
// eslint-disable-next-line
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import App from './App'
import 'antd/dist/reset.css'
import './styles/index.scss'
import 'dayjs/locale/ru'

dayjs.locale('ru')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
