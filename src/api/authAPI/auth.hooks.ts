import { useQuery } from '@tanstack/react-query'
import { UserRequest } from './authAPI.types'
import { getAllUser } from './auth.api'

export const useAllUser = (params: UserRequest) => {
  return useQuery({
    queryKey: ['getAllUser', params],
    queryFn: () => getAllUser(params),
  })
}
