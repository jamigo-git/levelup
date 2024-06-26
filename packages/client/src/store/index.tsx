import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import userReducer from './slices/user/userSlice'
import forumTopicReducer from './slices/forumTopic/forumTopicSlice'
import forumMessageReducer from './slices/forumMessage/forumMessageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    forumTopic: forumTopicReducer,
    forumMessage: forumMessageReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
