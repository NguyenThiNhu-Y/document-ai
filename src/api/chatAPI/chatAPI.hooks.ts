import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createAnwserQuestion,
  createChatSection,
  deleteChatSection,
  editChatSectionName,
  getChatMessages,
  getChatSections,
  getInfoChatSection,
  updateHaveNewChatSection,
} from '@/api/chatAPI/chatAPI.api'
import { QUERY_KEYS } from '@/api/common.enums'
import { DEFAULT_PAGINATION } from '@/constants/common'
import { PAGE_LIMIT } from '@/api/common.constants'
import { queryClient } from '@/api/QueryProvider'
import {
  ChatSectionRequest,
  ChatSectionResponse,
  InfoChatSectionRequest,
  MessagesResponse,
  NewChatRequestWithTmpChatId,
} from '@/api/chatAPI/chatAPI.types'

export const useChatSections = (params: ChatSectionRequest) => {
  return useInfiniteQuery({
    queryKey: ['getChatSections', QUERY_KEYS.INFINITE_CHAT_SECTIONS],

    queryFn: ({ pageParam = 1, signal }) =>
      getChatSections({ ...params, current_page: pageParam }, signal),

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
      const previousChatSections = queryClient.getQueryData<InfiniteData<ChatSectionResponse>>([
        QUERY_KEYS.INFINITE_CHAT_SECTIONS,
      ])

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

    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData<InfiniteData<ChatSectionResponse>>(
        [QUERY_KEYS.INFINITE_CHAT_SECTIONS],
        (old) => (context ? context.previousChatSections : old)
      )
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INFINITE_CHAT_SECTIONS] })
    },
  })
}

export const useMessages = (idChat: number) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.INFINITE_MESSAGES, idChat],

    queryFn: ({ pageParam = 1 }) =>
      getChatMessages({
        ...DEFAULT_PAGINATION,
        current_page: pageParam,
        idchat_section: idChat,
      }),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.message?.length === PAGE_LIMIT ? allPages.length + 1 : undefined
    },
  })
}

export const useCreateChat = () => {
  return useMutation({
    mutationFn: (params: NewChatRequestWithTmpChatId) => createChatSection(params),

    onMutate: (params) => {
      queryClient.setQueryData<InfiniteData<MessagesResponse>>(
        [QUERY_KEYS.INFINITE_MESSAGES, params.idchat_section],
        () => ({
          pageParams: [undefined],
          pages: [
            {
              ...DEFAULT_PAGINATION,
              message: [
                {
                  idhistory_chat: params.idchat_section,
                  question: params.question,
                  answer: '',
                  created_question: '',
                  created_answer: '',
                  iduser: DEFAULT_PAGINATION.iduser,
                  paragraph: '',
                  source: '',
                },
              ],
              total: 1,
            },
          ],
        })
      )
    },

    onSuccess: (newChatSection) => {
      queryClient.setQueryData<InfiniteData<MessagesResponse>>(
        [QUERY_KEYS.INFINITE_MESSAGES, newChatSection.idchat_section],
        () => ({
          pageParams: [undefined],
          pages: [
            {
              ...DEFAULT_PAGINATION,
              message: [newChatSection],
              total: 1,
            },
          ],
        })
      )

      queryClient.setQueryData<InfiniteData<ChatSectionResponse>>(
        [QUERY_KEYS.INFINITE_CHAT_SECTIONS],
        (old) => {
          if (old) {
            const firstPage = {
              ...old.pages[0],
              chat_sections: [newChatSection, ...old.pages[0].chat_sections],
            }

            return {
              ...old,
              pages: [firstPage, ...old.pages],
            }
          }

          return {
            pageParams: [undefined],
            pages: [
              {
                ...DEFAULT_PAGINATION,
                total: 1,
                chat_sections: [newChatSection],
              },
            ],
          }
        }
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['getChatSections', QUERY_KEYS.INFINITE_CHAT_SECTIONS],
      })
    },
  })
}

export const useCreateAnwserQuestion = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(createAnwserQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getChatSections', QUERY_KEYS.INFINITE_MESSAGES])
    },
    onMutate: (params) => {
      queryClient.setQueryData<InfiniteData<MessagesResponse>>(
        [QUERY_KEYS.INFINITE_MESSAGES, params.idchat_section],
        (old) => {
          if (old) {
            const lastPage = old.pages[old.pages.length - 1]

            return {
              ...old,
              pages: [
                ...old.pages,
                {
                  ...lastPage,
                  message: [
                    {
                      idhistory_chat: params.idchat_section,
                      question: params.question,
                      answer: '',
                      created_question: '',
                      created_answer: '',
                      iduser: DEFAULT_PAGINATION.iduser,
                      paragraph: '',
                      source: '',
                    },
                  ],
                },
              ],
            }
          }
        }
      )
    },
  })
  return mutation
}

export const useInfoChatSection = (params: InfoChatSectionRequest) => {
  return useQuery({
    queryKey: ['InfoChatSection', params],
    queryFn: () => getInfoChatSection(params),
  })
}

export const useDeleteChatSection = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteChatSection, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getChatSections'])
    },
  })
  return mutation
}

export const useUpdateHaveNewChatSection = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(updateHaveNewChatSection, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getChatSections'])
    },
  })
  return mutation
}
