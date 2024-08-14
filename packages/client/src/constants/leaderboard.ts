import { Rang } from '@/types/leaderboard'

/** Имя команды для лидерборда */
export const TEAM_NAME = 'LevelUp'

/** Поле сортировки для лидерборда (должно быть уникальным, для каждой команды) */
export const RATING_FIELD_NAME = 'kills_orcs_td'

/** Количество записей из БД которое необходимо получить */
export const LIMIT = 20

/** Курсор для пагинации */
export const CURSOR = 0

/** Размер страницы */
export const PAGE_SIZE = 10

/** Мапа рангов-цветов */
export const RANG_COLOR_MAP: Map<Rang, string> = new Map([
  ['Kid', 'red'],
  ['Bro', 'green'],
  ['Master', 'geekblue'],
  ['Pro', 'vocano'],
  ['God', 'orange'],
])

/** Мапа рангов-смертей */
export const RANG_KILLS_MAP: Map<number, Rang> = new Map([
  [0, 'Kid'],
  [20, 'Bro'],
  [130, 'Master'],
  [170, 'Pro'],
  [250, 'God'],
])

/** Мапа рангов-смертей */
export const RANG_REMAINING_MAP = {
  Kid: {
    remainingCount: 100,
    rang: 'Bro',
  },
  Bro: {
    remainingCount: 900,
    rang: 'Master',
  },

  Master: {
    remainingCount: 1000,
    rang: 'Pro',
  },

  Pro: {
    remainingCount: 8000,
    rang: 'God',
  },
}
