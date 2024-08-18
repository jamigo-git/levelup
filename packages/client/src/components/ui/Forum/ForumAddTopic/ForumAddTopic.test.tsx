import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
import { renderWithProviders } from '@/utils/test-utils'
import { RootState, setupStore } from '@/store/index'
import { userMock } from '@/__mocks__/mocks'
import { ForumAddTopic } from './ForumAddTopic'

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
        'ForumAddTopic.addTopicButtonText': 'Добавить топик',
        'ForumAddTopic.ForumAddTopicModal.forumAddTopicModalTitle': 'О чем поговорим?',
        'ForumAddTopic.ForumAddTopicModal.topicTitlePlaceholder': 'Введите название темы',
        'ForumAddTopic.ForumAddTopicModal.cancelButtonText': 'Отмена',
        'ForumAddTopic.ForumAddTopicModal.createButtonText': 'Создать',
      }
      return translations[str] || str
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

describe('ForumAddTopic', () => {
  test('does not render if no user is logged in', () => {
    renderWithProviders(<ForumAddTopic />)

    const addButton = screen.queryByText(/Добавить топик/i)
    expect(addButton).not.toBeInTheDocument()
  })

  test('opens modal when button is clicked', async () => {
    renderWithProviders(<ForumAddTopic />, { preloadedState })
    const addButton = screen.getByRole('button', { name: /Добавить топик/i })
    await userEvent.click(addButton)

    const modalTitle = screen.getByText(/О чем поговорим\?/i)
    expect(modalTitle).toBeInTheDocument()
  })

  test('closes modal when cancel button is clicked', async () => {
    renderWithProviders(<ForumAddTopic />, { preloadedState })
    const addButton = screen.getByText(/Добавить топик/i)
    await userEvent.click(addButton)
    const cancelButton = screen.getByRole('button', { name: /Отмена/i })

    await userEvent.click(cancelButton)

    const modal = screen.queryByRole('dialog', { name: /О чем поговорим\?/i })
    expect(modal).not.toBeInTheDocument()
  })

  test.skip('adds new topic when form is submitted', async () => {
    const store = setupStore(preloadedState)
    renderWithProviders(<ForumAddTopic />, { store })
    const addButton = screen.getByText(/Добавить топик/i)
    await userEvent.click(addButton)
    const titleInput = screen.getByPlaceholderText(/Введите название темы/i)
    const createButton = screen.getByRole('button', { name: /Создать/i })
    const testTitle = 'Test title'

    await userEvent.type(titleInput, testTitle)
    await userEvent.click(createButton)

    const newTopic = await screen.findByText(testTitle)
    expect(newTopic).toBeInTheDocument()
  })
})
