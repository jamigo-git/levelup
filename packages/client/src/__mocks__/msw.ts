import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { API_HOST } from '@/constants/serverHost'
import { getTopicCommentsListMock, getTopicListMock, testTopicCommentMock, testTopicMock, userMock } from './mocks'

export const handlers = [
  http.get(`${API_HOST}/yandex/auth/user`, () => {
    return HttpResponse.json(userMock)
  }),
  http.post(`${API_HOST}/yandex/auth/signin`, async ({ request }) => {
    const data = (await request.json()) as { login?: string; password?: string }
    const { login, password } = data
    if (login && password && !login.includes('invalid')) {
      return HttpResponse.text('OK')
    }
    return HttpResponse.json({ reason: 'Login or password is incorrect' }, { status: 401 })
  }),
  http.get(`${API_HOST}/api/forum/topics`, () => {
    return HttpResponse.json(getTopicListMock)
  }),
  http.post(`${API_HOST}/api/forum/topics`, () => {
    return HttpResponse.json({ total: 2, list: [testTopicMock, ...getTopicListMock.list] }, { status: 200 })
  }),
  http.get(`${API_HOST}/api/forum/comments`, () => {
    return HttpResponse.json(getTopicCommentsListMock)
  }),
  http.post(`${API_HOST}/api/forum/comments`, () => {
    return HttpResponse.json(
      { total: 2, list: [testTopicCommentMock, ...getTopicCommentsListMock.list] },
      { status: 200 }
    )
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
