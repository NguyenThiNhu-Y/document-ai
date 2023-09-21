import { InfiniteData, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { editChatSectionName, getChatSections } from '@/api/chatAPI/chatAPI.api'
import { QUERY_KEYS } from '@/api/common.enums'
import { DEFAULT_PAGINATION } from '@/constants/common'
import { PAGE_LIMIT } from '@/api/common.constants'
import { queryClient } from '@/api/QueryProvider'
import { ChatSectionResponse } from '@/api/chatAPI/chatAPI.types'

export const useChatSections = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.INFINITE_CHAT_SECTIONS],

    queryFn: ({ pageParam = 1, signal }) =>
      getChatSections({ ...DEFAULT_PAGINATION, current_page: pageParam }, signal),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.chat_sections.length === PAGE_LIMIT ? allPages.length + 1 : undefined
    },
  })
}

export const useUpdateChatSectionName = () => {
  return useMutation({
    mutationFn: editChatSectionName,

    onMutate: async ({ idchat_section, name }) => {
      // hủy call api getChatSection nếu như đang update lại name của 1 chat section
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.INFINITE_CHAT_SECTIONS] })

      // Snapshot the previous value
      const previousChatSections = queryClient.getQueryData([QUERY_KEYS.INFINITE_CHAT_SECTIONS])

      // Optimistically update to the new value
      queryClient.setQueryData<InfiniteData<ChatSectionResponse>>(
        [QUERY_KEYS.INFINITE_CHAT_SECTIONS],
        (old) => {
          if (!old) return undefined

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              chat_sections: page.chat_sections.map((section) => ({
                ...section,
                name: idchat_section === section.idchat_section ? name : section.name,
              })),
            })),
          }
        }
      )

      // Return a context object with the snapshotted value
      return { previousChatSections }
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData<InfiniteData<ChatSectionResponse>>(
        [QUERY_KEYS.INFINITE_CHAT_SECTIONS],
        (old) =>
          context ? (context.previousChatSections as InfiniteData<ChatSectionResponse>) : old
      )
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INFINITE_CHAT_SECTIONS] })
    },
  })
}
