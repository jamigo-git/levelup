export const routes = {
  root: {
    path: '/',
  },
  login: {
    path: '/login',
    title: 'Login',
  },
  profile: {
    path: '/profile',
    title: 'Profile',
  },
  game: {
    path: '/game',
    title: 'Game',
  },
  forum: {
    path: '/forum',
    title: 'Forum',
  },
  forumTopic: {
    path: '/forum/topic/:id',
    title: 'Forum Topic',
  },
} as const
