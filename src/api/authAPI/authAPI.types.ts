import { UserType } from '@/@types/user'

export interface AuthParam {
  username?: string
  email: string
  password?: string
  avatar?: string
}

export interface ResponseAuth {
  status: number
  data: {
    user: UserType
    token?: string
  }
  message?: string
}

export interface UserRequest {
  keyword: string
}

export interface UserRespone {
  iduser: number
  email: string
}
