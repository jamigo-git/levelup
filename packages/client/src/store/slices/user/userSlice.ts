import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_HOST } from '@/constants/serverHost'
import { syncUserWithDb } from '@/utils/syncUserWithDb'
import { ChangePassword, UserProfile } from '@/types/UserTypes'

const apiClient = axios.create({
  baseURL: `${API_HOST}/yandex/user`,
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
    syncUserWithDb(response.data)
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
      syncUserWithDb(response.data)
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
  initialState: {},
  reducers: {},
})

export default userSlice.reducer
