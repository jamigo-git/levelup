import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/routing/routes'
import { ForumLoginSuggest } from './ForumLoginSuggest'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('ForumLoginSuggest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the login suggestion text', () => {
    render(<ForumLoginSuggest />)
    const loginText = screen.getByText(/Авторизируйтесь/i)
    expect(loginText).toBeInTheDocument()
  })

  test('navigates to the login page when the button is clicked', async () => {
    const navigateMock = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(navigateMock)

    render(<ForumLoginSuggest />)
    const loginButton = screen.getByRole('button', { name: /Авторизируйтесь/i })
    await userEvent.click(loginButton)

    expect(navigateMock).toHaveBeenCalledWith(routes.login.path)
  })
})
