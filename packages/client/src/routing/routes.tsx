export const routes = {
  root: {
    path: '/',
    title: 'Главная',
    description:
      'Добро пожаловать на&nbsp;главную страницу игры LevelUp! Готовьтесь к&nbsp;захватывающим приключениям в&nbsp;мире tower defence. Играйте, сражайтесь и&nbsp;улучшайте свои навыки!',
  },
  login: {
    path: '/login',
    title: 'Войти в игру LevelUp',
    description:
      'Войдите в&nbsp;свой аккаунт в&nbsp;игре LevelUp и&nbsp;продолжите свое путешествие. Управляйте своим профилем, настройками и&nbsp;игровым прогрессом.',
  },
  registration: {
    path: '/registration',
    title: 'Зарегистрироваться в игре LevelUp',
    description: 'Присоединитесь к&nbsp;игре LevelUp, зарегистрируйтесь и&nbsp;начните свое приключение.',
  },
  profile: {
    path: '/profile',
    title: 'Профиль пользователя LevelUp',
    description:
      'Просмотрите свой профиль игрока в&nbsp;игре LevelUp. Узнайте свои достижения, статистику и&nbsp;прогресс в&nbsp;игре.',
  },
  game: {
    path: '/game',
    title: 'Начать игру LevelUp',
    description:
      'Погрузитесь в&nbsp;мир LevelUp и&nbsp;начните защищать свою территорию от&nbsp;врагов. Готовьте свои башни и&nbsp;стратегию для победы!',
  },
  forum: {
    path: '/forum',
    title: 'Форум игры LevelUp',
    description:
      'Общайтесь с&nbsp;другими игроками, делитесь советами и&nbsp;стратегиями на&nbsp;нашем форуме LevelUp. Узнавайте новости и&nbsp;обсуждайте последние обновления игры.',
  },
  forumTopic: {
    path: '/forum/topic/:id',
    title: 'Тема форума',
    description:
      'Общайтесь с&nbsp;другими игроками, делитесь советами и&nbsp;стратегиями на&nbsp;нашем форуме LevelUp. Узнавайте новости и&nbsp;обсуждайте последние обновления игры.',
  },
  leaderboard: {
    path: '/leaderboard',
    title: 'Таблица лучших в игре LevelUp!',
    description:
      'Просмотрите таблицу лучших игроков в&nbsp;игре LevelUp. Узнайте, кто занимает верхние места и&nbsp;соревнуйтесь за&nbsp;первенство!',
  },
} as const
