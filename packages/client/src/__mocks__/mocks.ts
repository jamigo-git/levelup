import { User } from '@/types/UserTypes'
import { Comment, Topic } from '@/types/forum'
import { LeaderboardData } from '@/types/leaderboard'

export const userMock: User = {
  id: 1,
  email: 'example@example.com',
  login: 'example',
  first_name: 'Джаред',
  second_name: 'Лето',
  display_name: 'Джаред Лето',
  phone: '+1234567890',
  avatar: '/a52e28aa-920b-4acb-a8de-f8d96e13302c/de8a38f7-b848-4786-adb8-2010d74c5cce_cat_at_work2.jpeg',
}

export const topicListMock: Topic[] = [
  {
    id: 1,
    title: 'Очень интересная тема',
    createdAt: '1719336294820',
    user: {
      first_name: 'Том',
      display_name: 'Том Круз',
      avatar: 'https://avatars.githubusercontent.com/u/1',
    },
    commentCount: ['1', '2', '3'],
  },
  {
    id: 2,
    title: 'Не интересная тема',
    createdAt: '1719336294820',
    user: {
      first_name: 'Антонио',
      display_name: 'Антонио Бандерас',
      avatar: 'https://avatars.githubusercontent.com/u/2',
    },
    commentCount: ['4', '5', '6'],
  },
]

export const messageListMock: Comment[] = [
  {
    id: 1,
    text: 'Согласен с автором',
    createdAt: '1719336294820',
    user: {
      first_name: 'Том',
      display_name: 'Том Круз',
      avatar: 'https://avatars.githubusercontent.com/u/1',
    },
  },
  {
    id: 2,
    text: 'Не согласен с автором',
    createdAt: '1719336294820',
    user: {
      first_name: 'Антонио',
      display_name: 'Антонио Бандерас',
      avatar: 'https://avatars.githubusercontent.com/u/2',
    },
  },
]

export const leaderboardMock: LeaderboardData[] = [
  {
    key: 1,
    position: 1,
    avatar: 'https://avatars.githubusercontent.com/u/55561',
    name: 'Andre',
    kills: 1000,
    waves: 50,
    rang: 'God',
  },
  {
    key: 2,
    position: 2,
    avatar: 'https://avatars.githubusercontent.com/u/55562',
    name: 'Vyacheslav',
    kills: 900,
    waves: 46,
    rang: 'Pro',
  },
  {
    key: 3,
    position: 3,
    avatar: 'https://avatars.githubusercontent.com/u/5553',
    name: 'Dr. Evil',
    kills: 855,
    waves: 44,
    rang: 'Pro',
  },
  {
    key: 4,
    position: 4,
    avatar: 'https://avatars.githubusercontent.com/u/5522',
    name: 'Valter',
    kills: 800,
    waves: 42,
    rang: 'Pro',
  },
  {
    key: 5,
    position: 5,
    avatar: 'https://avatars.githubusercontent.com/u/5513',
    name: 'MaXim',
    kills: 799,
    waves: 44,
    rang: 'Pro',
  },
  {
    key: 6,
    position: 6,
    avatar: 'https://avatars.githubusercontent.com/u/5514',
    name: 'Anderson Wick',
    kills: 733,
    waves: 40,
    rang: 'Master',
  },
  {
    key: 7,
    position: 7,
    avatar: 'https://avatars.githubusercontent.com/u/5524',
    name: 'Raptor Dead 7',
    kills: 733,
    waves: 40,
    rang: 'Master',
  },
  {
    key: 8,
    position: 8,
    avatar: 'https://avatars.githubusercontent.com/u/5556',
    name: 'Tank Jr',
    kills: 700,
    waves: 30,
    rang: 'Bro',
  },
  {
    key: 9,
    position: 9,
    avatar: 'https://avatars.githubusercontent.com/u/5511',
    name: 'Wake D Jr',
    kills: 300,
    waves: 30,
    rang: 'Kid',
  },
  {
    key: 10,
    position: 10,
    avatar: 'https://avatars.githubusercontent.com/u/5587',
    name: 'Tom Walker',
    kills: 290,
    waves: 22,
    rang: 'Kid',
  },
  {
    key: 11,
    position: 11,
    avatar: 'https://avatars.githubusercontent.com/u/5111',
    name: 'Robert De Niro',
    kills: 222,
    waves: 21,
    rang: 'Kid',
  },
]
