import host from '@/constants/host'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { userMock } from './mocks'

export const handlers = [
  http.get(`${host}/auth/user`, () => {
    return HttpResponse.json(userMock)
  }),
  http.post(`${host}/auth/signin`, async ({ request }) => {
    const data = (await request.json()) as { login?: string; password?: string }
    const { login, password } = data
    if (login && password && !login.includes('invalid')) {
      return HttpResponse.text('OK')
    }
    return HttpResponse.json({ reason: 'Login or password is incorrect' }, { status: 401 })
  }),
  http.options('*', () => {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  }),
]

export const server = setupServer(...handlers)
