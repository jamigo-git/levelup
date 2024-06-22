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

  return (
    <div>
      <p>{status}</p>
      <p>Что-то пошло не так :(</p>
    </div>
  )
}
