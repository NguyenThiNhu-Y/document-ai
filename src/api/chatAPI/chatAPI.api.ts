import axios from '@/api/axios'
import {
  ChatSectionRequest,
  ChatSectionResponse,
  EditChatSectionNameRequest,
} from '@/api/chatAPI/chatAPI.types'

export const getChatSections = async (params: ChatSectionRequest) => {
  const result: ChatSectionResponse = await axios.get('/get_chat_section', { params })
  return result
}

export const editChatSectionName = async (data: EditChatSectionNameRequest) => {
  return await axios.put('/update_name_chat_section', data)
}
