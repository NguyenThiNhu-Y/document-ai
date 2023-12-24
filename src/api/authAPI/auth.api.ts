import {
  AddUserToGroup,
  AuthParam,
  ResponseAuth,
  UserInGroup,
  UserInGroupRequest,
  UserRequest,
  UserRespone,
} from '@/api/authAPI/authAPI.types'
import axios from '@/api/axios'

export const login = async (params: AuthParam) => {
  const result: ResponseAuth = await axios.post('/login', params)
  return result
}

export const loginGG = async (params: AuthParam) => {
  const result: ResponseAuth = await axios.post('/login_gg', params)
  return result
}

export const getAllUser = async (params: UserRequest) => {
  const result: UserRespone[] = await axios.get('/get_all_user', { params })
  return result
}

export const addUserToGroup = async (body: AddUserToGroup) => {
  const result: number = await axios.post('/add_user_group', body)
  return result
}

export const getUserInGroup = async (params: UserInGroupRequest) => {
  const result: UserInGroup[] = await axios.get('/get_user_in_group', { params })
  return result
}
