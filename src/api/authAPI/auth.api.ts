import { AuthParam } from '@/api/authAPI/authAPI.types'
import axios from '@/api/axios'

export const login = async (params: AuthParam) => {
  const result = await axios.post('/login', params)
  return result
}
