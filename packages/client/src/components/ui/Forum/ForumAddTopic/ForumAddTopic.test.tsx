import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
import { renderWithProviders } from '@/utils/test-utils'
import { RootState, setupStore } from '@/store/index'
import { topicListMock, userMock } from '@/__mocks__/mocks'
import { Topic } from '@/types/forum'
import { ForumAddTopic } from './ForumAddTopic'

const preloadedState: Partial<RootState> = {
  auth: {
    user: userMock,
    isAuth: true,
    isAuthenticating: false,
    status: 'succeeded',
    error: null,
  },
  forumTopic: {
    idList: topicListMock.map(topic => topic.id),
    byId: topicListMock.reduce(
      (acc, topic) => {
        acc[topic.id] = topic
        return acc
      },
      {} as Record<string, Topic>
    ),
  },
}

describe('ForumAddTopic', () => {
  test('does not render if no user is logged in', () => {
    renderWithProviders(<ForumAddTopic />)

    const addButton = screen.queryByText(/Добавить топик/i)
    expect(addButton).not.toBeInTheDocument()
  })

  test('opens modal when button is clicked', async () => {
    renderWithProviders(<ForumAddTopic />, { preloadedState })
    const addButton = screen.getByText(/Добавить топик/i)

    await userEvent.click(addButton)

    const modal = screen.getByRole('dialog', { name: /О чем поговорим\?/i })
    expect(modal).toBeInTheDocument()
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

  test('adds new topic when form is submitted', async () => {
    const store = setupStore(preloadedState)
    renderWithProviders(<ForumAddTopic />, { store })
    const addButton = screen.getByText(/Добавить топик/i)
    await userEvent.click(addButton)
    const titleInput = screen.getByPlaceholderText(/Введите название темы/i)
    const createButton = screen.getByRole('button', { name: /Создать/i })
    const testTitle = 'Test title'

    await userEvent.type(titleInput, testTitle)
    await userEvent.click(createButton)

    const topicState = store.getState().forumTopic
    const newTopicId = Object.keys(topicState.byId).find(id => topicState.byId[id].title === testTitle)
    expect(newTopicId).toBeDefined()
  })
})
