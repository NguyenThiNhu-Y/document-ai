import { AuthParam, ResponseAuth } from '@/api/authAPI/authAPI.types'
import axios from '@/api/axios'

export const login = async (params: AuthParam) => {
  const result: ResponseAuth = await axios.post('/login', params)
  return result
}

export const loginGG = async (params: AuthParam) => {
  const result: ResponseAuth = await axios.post('/login_gg', params)
  return result
}
