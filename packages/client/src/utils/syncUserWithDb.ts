import axios from 'axios'
import { API_HOST } from '@/constants/serverHost'
import { User } from '@/types/UserTypes'

export const syncUserWithDb = async (user: User) => {
  try {
    axios.post(`${API_HOST}/api/users`, user)
  } catch (error) {
    console.error('Error on syncUserWithDb', error)
  }
}
