import axios from 'axios'
import { SERVER_HOST } from '@/constants/serverHost'
import { RANG_KILLS_MAP, RATING_FIELD_NAME, TEAM_NAME } from '@/constants/leaderboard'
import { LeaderboardUpdateReq, Rang, StatisticData, UserStatisticData } from '@/types/leaderboard'

class Statistic {
  private url = `${SERVER_HOST}/yandex`

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

  public async send(userData: UserStatisticData, statistic: StatisticData) {
    try {
      const statisticData: LeaderboardUpdateReq = {
        data: {
          waves: statistic.bestWavesCount,
          kills_orcs_td: statistic.bestKillCount,
          rang: Statistic.getRang(statistic.bestKillCount),
          name: userData.login,
          avatar: userData.avatar,
          money: statistic.currentCoins,
        },
        ratingFieldName: RATING_FIELD_NAME,
        teamName: TEAM_NAME,
      }

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
