import React from 'react'
<<<<<<< HEAD
=======
import { Provider } from 'react-redux'
// eslint-disable-next-line
>>>>>>> 60768d0 (LVL-36: Реализовать логику авторизации)
import ReactDOM from 'react-dom/client'
import App from './App'
<<<<<<< HEAD
import './index.css'
=======
import 'antd/dist/reset.css'
import './styles/index.scss'
import 'dayjs/locale/ru'
import { store } from './store'

dayjs.locale('ru')
>>>>>>> 60768d0 (LVL-36: Реализовать логику авторизации)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
