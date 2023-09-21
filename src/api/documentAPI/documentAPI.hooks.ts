import { useInfiniteQuery } from '@tanstack/react-query'
import { DocumentRequest } from '@/api/documentAPI/documentAPI.types'
import { getDocuments } from '@/api/documentAPI/documentAPI.api'
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
