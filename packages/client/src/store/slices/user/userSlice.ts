import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '@/types/user'

const initialState: { user: User | null } = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User | null }>) => {
      state.user = action.payload.user
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
