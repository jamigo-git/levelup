import { render, screen } from '@testing-library/react'
import App from './App'

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({}),
})

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText('HomePage')).toBeDefined()
})
