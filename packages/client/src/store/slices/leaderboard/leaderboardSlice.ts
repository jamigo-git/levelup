import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { leaderboardMock } from '@/__mocks__/mocks'
import type { TableData } from '@/types/leaderboard'

const initialStateMock: TableData[] = leaderboardMock

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: initialStateMock,
  reducers: {
    updateLeaderboard: (state, action: PayloadAction<{ data: TableData[] }>) => {
      state = action.payload.data
    },
  },
})

export const { updateLeaderboard } = leaderboardSlice.actions
export default leaderboardSlice.reducer
