import { User } from '@/types/UserTypes'
import { Message, Topic } from '@/types/forum'

export const userMock: User = {
  id: 1,
  email: 'example@example.com',
  login: 'example',
  first_name: 'Джаред',
  second_name: 'Лето',
  display_name: 'Джаред Лето',
  phone: '+1234567890',
  avatar: 'https://avatars.githubusercontent.com/u/5',
}

export const topicListMock: Topic[] = [
  {
    id: '1',
    title: 'Очень интересная тема',
    createdAt: '1719336294820',
    author: {
      display_name: 'Том Круз',
      avatar: 'https://avatars.githubusercontent.com/u/1',
    },
    messageIds: ['1', '2', '3'],
  },
  {
    id: '2',
    title: 'Не интересная тема',
    createdAt: '1719336294820',
    author: {
      display_name: 'Антонио Бандерас',
      avatar: 'https://avatars.githubusercontent.com/u/2',
    },
    messageIds: ['4', '5', '6'],
  },
  {
    id: '3',
    title: 'Еще одна интересная тема',
    createdAt: '1719336294820',
    author: {
      display_name: 'Николас Кейдж',
      avatar: 'https://avatars.githubusercontent.com/u/3',
    },
    messageIds: ['7'],
  },
  {
    id: '4',
    title: 'Еще одна не интересная тема',
    createdAt: '1719336294820',
    author: {
      display_name: 'Джеки Чан',
      avatar: 'https://avatars.githubusercontent.com/u/4',
    },
    messageIds: [],
  },
  {
    id: '5',
    title: 'Еще одна очень интересная тема',
    createdAt: '1719336294820',
    author: {
      display_name: 'Брюс Ли',
      avatar: 'https://avatars.githubusercontent.com/u/5',
    },
    messageIds: [],
  },
  {
    id: '6',
    title: 'Еще одна супер интересная тема',
    createdAt: '1719336294820',
    author: {
      display_name: 'Киану Ривз',
      avatar: 'https://avatars.githubusercontent.com/u/6',
    },
    messageIds: [],
  },
  {
    id: '7',
    title: 'Еще одна увлекательная тема',
    createdAt: '1719336294820',
    author: {
      display_name: 'Джейсон Стэтхэм',
      avatar: 'https://avatars.githubusercontent.com/u/7',
    },
    messageIds: [],
  },
]

export const messageListMock: Message[] = [
  {
    id: '1',
    text: 'Согласен с автором',
    createdAt: '1719336294820',
    author: {
      display_name: 'Том Круз',
      avatar: 'https://avatars.githubusercontent.com/u/1',
    },
  },
  {
    id: '2',
    text: 'Не согласен с автором',
    createdAt: '1719336294820',
    author: {
      display_name: 'Антонио Бандерас',
      avatar: 'https://avatars.githubusercontent.com/u/2',
    },
  },
  {
    id: '3',
    text: 'Интересная точка зрения',
    createdAt: '1719336294820',
    author: {
      display_name: 'Николас Кейдж',
      avatar: 'https://avatars.githubusercontent.com/u/3',
    },
  },
  {
    id: '4',
    text: 'Совершенно согласен',
    createdAt: '1719336294820',
    author: {
      display_name: 'Джеки Чан',
      avatar: 'https://avatars.githubusercontent.com/u/4',
    },
  },
  {
    id: '5',
    text: 'Не согласен',
    createdAt: '1719336294820',
    author: {
      display_name: 'Брюс Ли',
      avatar: 'https://avatars.githubusercontent.com/u/5',
    },
  },
  {
    id: '6',
    text: 'Согласен',
    createdAt: '1719336294820',
    author: {
      display_name: 'Киану Ривз',
      avatar: 'https://avatars.githubusercontent.com/u/6',
    },
  },
  {
    id: '7',
    text: 'Интересно',
    createdAt: '1719336294820',
    author: {
      display_name: 'Джейсон Стэтхэм',
      avatar: 'https://avatars.githubusercontent.com/u/7',
    },
  },
]
