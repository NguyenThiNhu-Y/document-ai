import axios from '@/api/axios'
import {
  ChatSectionRequest,
  ChatSectionResponse,
  EditChatSectionNameRequest,
} from '@/api/chatAPI/chatAPI.types'
import { GenericAbortSignal } from 'axios'

export const getChatSections = async (params: ChatSectionRequest, signal?: GenericAbortSignal) => {
  const result: ChatSectionResponse = await axios.get('/get_chat_section', { params, signal })
  return result
}

export const editChatSectionName = async (data: EditChatSectionNameRequest) => {
  return await axios.put('/update_name_chat_section', data)
}
