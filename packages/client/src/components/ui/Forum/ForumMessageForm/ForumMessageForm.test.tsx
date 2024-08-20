import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { RootState, setupStore } from '@/store/index'
import { renderWithProviders } from '@/utils/test-utils'
import { userMock } from '@/__mocks__/mocks'
import { ForumMessageForm } from './ForumMessageForm'

const preloadedState: Partial<RootState> = {
  auth: {
    user: userMock,
    isAuth: true,
    isAuthenticating: false,
    status: 'succeeded',
    error: null,
  },
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => {
      const translations: Record<string, string> = {
        'ForumMessageForm.topicMessageTextPlaceholder': 'Введите сообщение',
        'ForumMessageForm.sendButtonText': 'Отправить',
      }
      return translations[str] || str
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

describe('ForumMessageForm', () => {
  test('renders the message form', () => {
    renderWithProviders(<ForumMessageForm topicId={1} onReply={() => {}} />, { preloadedState })

    const messageInput = screen.getByPlaceholderText('Введите сообщение')
    const submitButton = screen.getByRole('button', { name: 'Отправить' })

    expect(messageInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  test.skip('adds message when form is submitted', async () => {
    const store = setupStore(preloadedState)
    renderWithProviders(<ForumMessageForm topicId={1} onReply={() => {}} />, { store })
    const messageInput = screen.getByPlaceholderText('Введите сообщение')
    const submitButton = screen.getByRole('button', { name: 'Отправить' })
    const testText = 'Test message'

    await userEvent.type(messageInput, testText)
    await userEvent.click(submitButton)

    const newMessage = await screen.findByText(testText)
    expect(newMessage).toBeInTheDocument()
  })
})
