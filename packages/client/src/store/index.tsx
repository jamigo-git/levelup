import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import gameReducer from './slices/game/gameSlice'
import leaderboardReducer from './slices/leaderboard/leaderboardSlice'
import forumApiService from './slices/forumApi/forumApiService'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

// Create the root reducer independently to obtain the RootState type
export const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  leaderboard: leaderboardReducer,
  [forumApiService.reducerPath]: forumApiService.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(forumApiService.middleware),
  preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
