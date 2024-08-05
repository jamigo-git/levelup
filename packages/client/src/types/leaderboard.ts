export interface LeaderboardData {
  key: number
  position: number
  avatar: string
  name: string
  kills: number
  waves: number
  rang: Rang
}

/** Интерфейс запроса обновления данных в БД по пользователю */
export interface LeaderboardUpdateReq {
  data: {
    waves: number
    kills_orcs_td: number
    rang: Rang
    name: string
    avatar: string
    money: number
  }
  ratingFieldName: string
  teamName: string
}

/** Интерфейс запроса по лидерборду команды */
export interface LeaderboardTeamReq {
  ratingFieldName: string
  cursor: number
  limit: number
}

/** Интерфейс ответа по лидерборду */
export interface LeaderboardTeamResponse {
  data: {
    name: string
    rang: string
    money: number
    waves: number
    avatar: string
    kills_orcs_td: number
  }
}

export type Rang = 'Kid' | 'Bro' | 'Master' | 'Pro' | 'God'
