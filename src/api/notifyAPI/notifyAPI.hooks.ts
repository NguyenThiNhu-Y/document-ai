import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createNotifyChatsection,
  createNotifyNote,
  deleteNotify,
  getAllNotify,
  getNotifyIsNoteRead,
  updateNotifyIsClick,
  updateNotifyIsRead,
} from '@/api/notifyAPI/notifyAPI.api'
import { NotifyIsReadRequest, NotifyRequest } from '@/api/notifyAPI/notifyAPI.types'
import { PAGE_LIMIT } from '@/api/common.constants'

export const useCreateNotifyChatSection = () => {
  const queryClient = useQueryClient()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation(createNotifyChatsection, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
  return mutation
}

export const usecreateNotifyNote = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation(createNotifyNote, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
  return mutation
}

export const useGetAllNotify = (params: NotifyRequest) => {
  return useInfiniteQuery({
    queryKey: ['getNotifies', params],
    queryFn: ({ pageParam = 1 }) => getAllNotify({ ...params, current_page: pageParam }),
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.notifies?.length === PAGE_LIMIT ? allPage?.length + 1 : undefined
    },
  })
}

export const useGetNotifyIsNoteRead = (params: NotifyIsReadRequest) => {
  return useQuery({
    queryKey: ['getNotifyIsNoteRead', params],
    queryFn: () => getNotifyIsNoteRead(params),
  })
}

export const useUpdateNoityIsRead = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(updateNotifyIsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getNotifies'])
    },
  })
  return mutation
}

export const useUpdateNoityIsClick = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(updateNotifyIsClick, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getNotifies'])
    },
  })
  return mutation
}

export const useDeleteNotity = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteNotify, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getNotifies'])
    },
  })
  return mutation
}
