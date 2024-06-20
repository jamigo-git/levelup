import App from './App'
import { render, screen } from '@testing-library/react'

const appContent = 'Вот тут будет жить ваше приложение :)'

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({}),
})

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContent)).toBeDefined()
})
