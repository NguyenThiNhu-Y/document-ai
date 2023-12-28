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

export interface AddUserToGroup {
  idchatsection: number
  list_iduser: number[]
}

export interface UserInGroupRequest {
  idchatsection: number
}

export interface UserInGroup {
  iduser: number
  username: string
  email: string
  avatar: string
}

export interface UserInGroupDeleteRequest {
  idchatsection: number
  iduser: number
}
