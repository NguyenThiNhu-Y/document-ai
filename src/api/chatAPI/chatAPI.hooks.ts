import { useMutation, useQuery } from '@tanstack/react-query'
import { ChatSectionRequest } from '@/api/chatAPI/chatAPI.types'
import { editChatSectionName, getChatSections } from '@/api/chatAPI/chatAPI.api'

export const useChatSections = (params: ChatSectionRequest) => {
  return useQuery({
    queryKey: ['getChatSections', params],
    queryFn: () => getChatSections(params),
  })
}

export const useUpdateChatSectionName = () => {
  return useMutation(editChatSectionName)
}
