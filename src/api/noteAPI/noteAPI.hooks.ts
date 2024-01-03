import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  NoteRequest,
  UserInNoteRequest,
  UserNotInNoteRequest,
  UserNoteRequest,
  ViewEditNoteRequest,
} from '@/api/noteAPI/noteAPI.type'
import {
  createNote,
  deleteNote,
  deleteUserInNote,
  getAllUserInNote,
  getIsEdit,
  getNote,
  getNotes,
  getNotesShareWithYou,
  getUserInNote,
  pinNote,
  shareNote,
  updateNote,
} from '@/api/noteAPI/noteAPI.api'
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

export const useNotesShareWithYou = (params: NoteRequest) => {
  return useInfiniteQuery({
    queryKey: ['getNotesShareWithYou', params],
    queryFn: ({ pageParam = 1 }) => getNotesShareWithYou({ ...params, current_page: pageParam }),
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

export const useUpdateNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(updateNote, {
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

export const useShareNote = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation(shareNote, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
  return mutation
}

export const useGetUserInNote = (params: UserNoteRequest) => {
  return useQuery({
    queryKey: ['getUserInNote', params],
    queryFn: () => getUserInNote(params),
  })
}

export const useGetNote = (params: ViewEditNoteRequest) => {
  return useQuery({
    queryKey: ['getNote', params],
    queryFn: () => getNote(params),
  })
}

export const useDeleteUserInNote = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteUserInNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getUserInNote'])
    },
  })
  return mutation
}

export const useAllUserInNote = (params: UserNotInNoteRequest) => {
  return useQuery({
    queryKey: ['getAllUserInNote', params],
    queryFn: () => getAllUserInNote(params),
  })
}

export const useGetIsEdit = (params: UserInNoteRequest) => {
  return useQuery({
    queryKey: ['getIsEdit', params],
    queryFn: () => getIsEdit(params),
  })
}
