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
  [100, 'Bro'],
  [1000, 'Master'],
  [2000, 'Pro'],
  [10000, 'God'],
])
