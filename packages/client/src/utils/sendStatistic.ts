import axios from 'axios'
import host from '@/constants/host'
import { RANG_KILLS_MAP, RATING_FIELD_NAME, TEAM_NAME } from '@/constants/leaderboard'
import { LeaderboardUpdateReq, Rang } from '@/types/leaderboard'
import { store } from '../store'

class Statistic {
  private url = `${host}`

  private client = axios.create({
    baseURL: this.url,
    withCredentials: true,
  })

  private static getRang(kills: number): Rang {
    let result: Rang = 'Kid'
    RANG_KILLS_MAP.forEach((value, key) => {
      if (key <= kills) result = value
    })
    return result
  }

  private static async getUser(): Promise<{ login: string; avatar: string }> {
    return store.dispatch(async () => {
      const { user } = store.getState().auth
      return {
        login: user?.login || '',
        avatar: user?.avatar || '',
      }
    })
  }

  private static async getStatistic(): Promise<{
    bestWavesCount: number
    bestKillCount: number
    currentCoins: number
  }> {
    return store.dispatch(async () => {
      const { game } = store.getState()
      return {
        bestWavesCount: game.bestWavesCount,
        bestKillCount: game.bestKillCount,
        currentCoins: game.currentCoins,
      }
    })
  }

  private static async getData(): Promise<LeaderboardUpdateReq> {
    const user = await Statistic.getUser()
    const statistic = await Statistic.getStatistic()
    return {
      data: {
        waves: statistic.bestWavesCount,
        kills_orcs_td: statistic.bestKillCount,
        rang: Statistic.getRang(statistic.bestKillCount),
        name: String(user?.login),
        avatar: String(user?.avatar),
        money: statistic.currentCoins,
      },
      ratingFieldName: RATING_FIELD_NAME,
      teamName: TEAM_NAME,
    }
  }

  public async send() {
    try {
      const statisticData: LeaderboardUpdateReq = await Statistic.getData()
      await this.client.post('/leaderboard', statisticData)
      return { success: true }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { error: error.response.data.reason }
      }
      return { error: 'An unknown error occurred' }
    }
  }
}

const sendStatistic = new Statistic()
export default sendStatistic
