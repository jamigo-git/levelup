import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { RootState, setupStore } from '@/store/index'
import { renderWithProviders } from '@/utils/test-utils'
import { topicListMock, userMock } from '@/__mocks__/mocks'
import { Topic } from '@/types/forum'
import { ForumMessageForm } from './ForumMessageForm'

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

describe('ForumMessageForm', () => {
  test('renders the message form', () => {
    renderWithProviders(<ForumMessageForm topicId={topicListMock[0].id} />, { preloadedState })

    const messageInput = screen.getByPlaceholderText('Введите сообщение')
    const submitButton = screen.getByRole('button', { name: 'Отправить' })

    expect(messageInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  test('adds message when form is submitted', async () => {
    const store = setupStore(preloadedState)
    renderWithProviders(<ForumMessageForm topicId={topicListMock[0].id} />, { store })
    const messageInput = screen.getByPlaceholderText('Введите сообщение')
    const submitButton = screen.getByRole('button', { name: 'Отправить' })
    const testText = 'Test message'

    await userEvent.type(messageInput, testText)
    await userEvent.click(submitButton)

    const messagesState = store.getState().forumMessage
    const messageId = Object.keys(messagesState.byId).find(key => messagesState.byId[key].text === testText)
    expect(messageId).toBeDefined()
  })
})
