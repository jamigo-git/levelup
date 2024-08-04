import type { RenderOptions } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppStore, RootState, setupStore } from '../store'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries' | 'wrapper'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  path?: string
}

export function renderWithProviders(ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    path = '/',
    ...renderOptions
  } = extendedRenderOptions

  const Providers = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <HelmetProvider>{children}</HelmetProvider>
    </Provider>
  )

  const { pathname } = new URL(`http://www.test.com${path}`)
  const router = createMemoryRouter([{ path: pathname, element: <Providers>{ui}</Providers> }], {
    initialEntries: [path],
  })

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(<RouterProvider router={router} />, { ...renderOptions }),
  }
}
