import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import gameReducer from './slices/game/gameSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
