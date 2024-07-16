import '@testing-library/jest-dom'

import { server } from './src/__mocks__/msw'

server.listen()

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
