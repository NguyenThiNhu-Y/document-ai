import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  DocumentRequest,
  DocumentSummaryRequest,
  IdDocumentRequest,
  NameDocumentRequest,
} from '@/api/documentAPI/documentAPI.types'
import {
  deleteDocument,
  getDocumentSummary,
  getDocuments,
  getName,
  getNameDocument,
  uploadDocument,
} from '@/api/documentAPI/documentAPI.api'
import { PAGE_LIMIT } from '@/api/common.constants'

export const useDocuments = (params: DocumentRequest) => {
  return useInfiniteQuery({
    queryKey: ['getDocuments', params],
    queryFn: ({ pageParam = 1 }) => getDocuments({ ...params, current_page: pageParam }),
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.documents?.length === PAGE_LIMIT ? allPage?.length + 1 : undefined
    },
  })
}

export const useDocumentSummary = (params: DocumentSummaryRequest) => {
  return useQuery({
    queryKey: ['getDocumentSummary', params],
    queryFn: () => getDocumentSummary(params),
  })
}

export const useNameDocument = (params: NameDocumentRequest) => {
  return useQuery({
    queryKey: ['getNameDocument', params],
    queryFn: () => getNameDocument(params),
  })
}

export const useName = (params: IdDocumentRequest) => {
  return useQuery({
    queryKey: ['getName', params],
    queryFn: () => getName(params),
  })
}

export const useDeleteDocument = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getDocuments'])
    },
  })
  return mutation
}

export const useUploadDocument = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(uploadDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getDocuments'])
    },
  })
  return mutation
}
