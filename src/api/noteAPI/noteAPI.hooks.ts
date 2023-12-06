import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { NoteRequest } from "./noteAPI.type"
import { createNote, deleteNote, getNotes, pinNote } from "./noteAPI.api"
import { PAGE_LIMIT } from '@/api/common.constants'

export const useNotes = (params: NoteRequest) => {
  return useInfiniteQuery({
    queryKey: ['getNotess', params],
    queryFn: ({ pageParam = 1 }) => getNotes({ ...params, current_page: pageParam }),
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.notes?.length === PAGE_LIMIT ? allPage?.length + 1 : undefined
    },
  })
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
  return mutation
}

export const usePinNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(pinNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getNotess'])
    },
  })
  return mutation
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getNotess'])
    },
  })
  return mutation
}
