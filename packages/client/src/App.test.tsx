import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }))

test('Example test', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getByTestId('HomePage')).toBeDefined()
})
