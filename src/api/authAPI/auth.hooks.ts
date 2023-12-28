import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserInGroupRequest, UserRequest } from '@/api/authAPI/authAPI.types'
import {
  addUserToGroup,
  deleteUserInGroup,
  getAllUser,
  getUserInGroup,
  login,
} from '@/api/authAPI/auth.api'

export const useAllUser = (params: UserRequest) => {
  return useQuery({
    queryKey: ['getAllUser', params],
    queryFn: () => getAllUser(params),
  })
}

export const userAddUserToGroup = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation(addUserToGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
  return mutation
}

export const useGetUserInGroup = (params: UserInGroupRequest) => {
  return useQuery({
    queryKey: ['getUserInGroup', params],
    queryFn: () => getUserInGroup(params),
  })
}

export const useDeleteUserInGroup = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteUserInGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getUserInGroup'])
    },
  })
  return mutation
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
  return mutation
}
