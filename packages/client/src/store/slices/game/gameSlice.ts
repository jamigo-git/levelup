import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GameSliceState = {
  isRunning: boolean
  isEnding: boolean
  currentWaves: number
  currenKillCount: number
  bestKillCount: number
  bestWavesCount: number
  currentCoins: number
}

const initialState: GameSliceState = {
  isRunning: false,
  isEnding: false,
  currentWaves: 0,
  currenKillCount: 0,
  bestKillCount: 0,
  bestWavesCount: 0,
  currentCoins: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload

      if (state.isRunning) {
        state.currentWaves = 0
        state.currenKillCount = 0
      } else {
        if (state.bestKillCount < state.currenKillCount) {
          state.bestKillCount = state.currenKillCount
        }
        if (state.bestWavesCount < state.currentWaves) {
          state.bestWavesCount = state.currentWaves
        }
      }
    },
    setIsEnding: (state, action: PayloadAction<boolean>) => {
      state.isEnding = action.payload
    },
    setStatistic: (
      state,
      action: PayloadAction<{
        waves: number
        kill: number
        coins: number
      }>
    ) => {
      const { waves, kill, coins } = action.payload
      state.currenKillCount = kill
      state.currentWaves = waves
      state.currentCoins = coins
    },
  },
})

export const { setIsRunning, setStatistic, setIsEnding } = gameSlice.actions
export default gameSlice.reducer
