import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { TEAM_NAME } from '@/constants/leaderboard'
import { SERVER_HOST } from '@/constants/serverHost'
import { LeaderboardData, LeaderboardTeamReq, LeaderboardTeamResponse, Rang } from '@/types/leaderboard'

const apiClient = axios.create({
  baseURL: `${SERVER_HOST}/yandex/leaderboard`,
  withCredentials: true,
})

interface LeaderboardState {
  leaderboard: LeaderboardData[] | undefined
  isLoaded: boolean
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
  isLoading: boolean
}

const initialState: LeaderboardState = {
  leaderboard: undefined,
  isLoaded: false,
  status: 'idle',
  error: null,
  isLoading: false,
}

/** Получение данных пользователей по команде */
export const leaderboardTeamReq = createAsyncThunk<LeaderboardTeamResponse[], LeaderboardTeamReq>(
  'leaderboard',
  async (leaderboardTeam, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/${TEAM_NAME}`, leaderboardTeam)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.reason)
      }
      return rejectWithValue({ reason: 'An unknown error occurred' })
    }
  }
)

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /** Кейсы на загрузку данных из БД */
      .addCase(leaderboardTeamReq.pending, state => {
        state.isLoading = true
        state.status = 'pending'
      })
      .addCase(leaderboardTeamReq.fulfilled, (state, action) => {
        state.isLoaded = true
        state.status = 'succeeded'
        state.leaderboard = action.payload.map((f, i) => {
          return {
            key: i,
            position: i + 1,
            avatar: f.data.avatar,
            name: f.data.name,
            kills: f.data.kills_orcs_td,
            waves: f.data.waves,
            rang: f.data.rang as Rang,
          }
        })
        state.isLoading = false
      })
      .addCase(leaderboardTeamReq.rejected, state => {
        state.leaderboard = undefined
        state.isLoaded = false
        state.status = 'failed'
        state.isLoading = false
      })
  },
})

export default leaderboardSlice.reducer
