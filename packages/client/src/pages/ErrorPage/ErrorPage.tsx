import { useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError()

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

  return (
    <div>
      <p>{status}</p>
      <p>{message}</p>
    </div>
  )
}
