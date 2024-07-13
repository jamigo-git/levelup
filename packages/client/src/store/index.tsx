import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import forumTopicReducer from './slices/forumTopic/forumTopicSlice'
import forumMessageReducer from './slices/forumMessage/forumMessageSlice'
import gameReducer from './slices/game/gameSlice'
import leaderboardReducer from './slices/leaderboard/leaderboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forumTopic: forumTopicReducer,
    forumMessage: forumMessageReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
