import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import forumTopicReducer from './slices/forumTopic/forumTopicSlice'
import forumMessageReducer from './slices/forumMessage/forumMessageSlice'
import gameReducer from './slices/game/gameSlice'
import leaderboardReducer from './slices/leaderboard/leaderboardSlice'

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  auth: authReducer,
  forumTopic: forumTopicReducer,
  forumMessage: forumMessageReducer,
  game: gameReducer,
  leaderboard: leaderboardReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
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
