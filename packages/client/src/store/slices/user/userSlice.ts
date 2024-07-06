import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import host from '@/constants/host'
import { ChangePassword, UserProfile } from '@/types/UserTypes'

const apiClient = axios.create({
  baseURL: `${host}/user`,
  withCredentials: true,
})

export const changePassword = createAsyncThunk<{ id: number }, ChangePassword>(
  'changePassword',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.put('/password', userData)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.reason)
      }
      return rejectWithValue({ reason: 'An unknown error occurred' })
    }
  }
)

export const editProfile = createAsyncThunk<void, UserProfile>('profile', async (userData, { rejectWithValue }) => {
  try {
    const response = await apiClient.put('/profile', userData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.reason)
    }
    return rejectWithValue({ reason: 'An unknown error occurred' })
  }
})

export const editProfileAvatar = createAsyncThunk<void, FormData>(
  'profileAvatar',
  async (avatar, { rejectWithValue }) => {
    try {
      const response = await apiClient.put('/profile/avatar', avatar)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.reason)
      }
      return rejectWithValue({ reason: 'An unknown error occurred' })
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuth: false,
    status: 'idle',
    error: null,
    isAuthenticating: true,
  },
  reducers: {},
})

export default userSlice.reducer
