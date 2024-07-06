import { useRouteError } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button, Flex, Space, Typography } from 'antd'
import styles from './ErrorPage.module.scss'

export const ErrorPage = () => {
  const error = useRouteError()

  const { Text } = Typography
  // eslint-disable-next-line no-console
  console.log(error)

  const status =
    (typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      (typeof error.status === 'number' || typeof error.status === 'string') &&
      error.status) ||
    502

  let message = 'Что-то пошло не так :('
  if (typeof error === 'object' && error !== null && 'message' in error) {
    message = error.message as string
  } else if (status === 404) {
    message = 'Вы заплутали :)'
  }

  const handleClick = () => {
    window.history.back()
  }

  return (
    <>
      <Helmet>
        <title>LVL UP!</title>
      </Helmet>
      <Flex align='center' justify='center' className={styles.errorPage}>
        <Space direction='vertical' align='center' size={20}>
          <Text className={styles.errorPage__title}>{status}</Text>
          <Text className={styles.errorPage__subtitle}>{message}</Text>
          <Button size='large' type='primary' onClick={handleClick}>
            Вернуться
          </Button>
        </Space>
      </Flex>
    </>
  )
}
