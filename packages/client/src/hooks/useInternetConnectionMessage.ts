import { message } from 'antd'
import { useEffect } from 'react'

const ERROR_MESSAGE = 'Нет подключения к интернету :( Часть функционала может быть недоступна'
const SUCCESS_MESSAGE = 'Интернет снова с нами!'

export const useInternetConnectionMessage = () => {
  useEffect(() => {
    if (!navigator.onLine) {
      message.error(ERROR_MESSAGE, 3)
    }

    const handleOnline = () => {
      message.success(SUCCESS_MESSAGE)
    }

    const handleOffline = () => {
      message.error(ERROR_MESSAGE, 3)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
}
