import { User } from '@/types/user'
import { Message, Topic } from '@/types/forum'
import { TableData } from '@/types/leaderboard'

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

export const tableDataMock: TableData[] = [
  {
    key: '1',
    position: 1,
    avatar: 'https://avatars.githubusercontent.com/u/55561',
    name: 'Andre',
    kills: 1000,
    waves: 50,
    rang: 'God',
  },
  {
    key: '2',
    position: 2,
    avatar: 'https://avatars.githubusercontent.com/u/55562',
    name: 'Vyacheslav',
    kills: 900,
    waves: 46,
    rang: 'Pro',
  },
  {
    key: '3',
    position: 3,
    avatar: 'https://avatars.githubusercontent.com/u/5553',
    name: 'Dr. Evil',
    kills: 855,
    waves: 44,
    rang: 'Pro',
  },
  {
    key: '4',
    position: 4,
    avatar: 'https://avatars.githubusercontent.com/u/5522',
    name: 'Valter',
    kills: 800,
    waves: 42,
    rang: 'Pro',
  },
  {
    key: '5',
    position: 5,
    avatar: 'https://avatars.githubusercontent.com/u/5513',
    name: 'MaXim',
    kills: 799,
    waves: 44,
    rang: 'Pro',
  },
  {
    key: '6',
    position: 6,
    avatar: 'https://avatars.githubusercontent.com/u/5514',
    name: 'Anderson Wick',
    kills: 733,
    waves: 40,
    rang: 'Master',
  },
  {
    key: '7',
    position: 7,
    avatar: 'https://avatars.githubusercontent.com/u/5524',
    name: 'Raptor Dead 7',
    kills: 733,
    waves: 40,
    rang: 'Master',
  },
  {
    key: '8',
    position: 8,
    avatar: 'https://avatars.githubusercontent.com/u/5556',
    name: 'Tank Jr',
    kills: 700,
    waves: 30,
    rang: 'Bro',
  },
  {
    key: '9',
    position: 9,
    avatar: 'https://avatars.githubusercontent.com/u/5511',
    name: 'Wake D Jr',
    kills: 300,
    waves: 30,
    rang: 'Kid',
  },
]
