import { renderToString } from 'react-dom/server'
import dayjs from 'dayjs'
import 'antd/dist/reset.css'
import './styles/index.scss'
import 'dayjs/locale/ru'
import { TestComponent } from './TestComponent'

dayjs.locale('ru')

//
// const app = () => {
//   return (
//     <StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </StrictMode>
//   )
// }

export const render = () => renderToString(<TestComponent />)
