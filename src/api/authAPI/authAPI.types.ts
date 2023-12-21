export interface AuthParam {
  username?: string
  email: string
  password?: string
  avatar?: string
}

export interface ResponseAuth {
  status: number
  data: {
    user: unknown
    token?: string
  }
  message?: string
}
