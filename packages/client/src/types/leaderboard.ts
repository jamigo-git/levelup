export interface TableData {
  key: string
  position: number
  avatar: string
  name: string
  kills: number
  waves: number
  rang: Rang
}

export type Rang = 'Kid' | 'Bro' | 'Master' | 'Pro' | 'God'
