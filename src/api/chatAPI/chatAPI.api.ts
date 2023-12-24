import axios from '@/api/axios'
import {
  ChatSectionRequest,
  ChatSectionResponse,
  DeleteChatSectionRequest,
  EditChatSectionNameRequest,
  InfoChatSectionRequest,
  InfoChatSectionResponse,
  Message,
  MessagesRequest,
  MessagesResponse,
  NewAnwserQuestionRequest,
  NewChatRequest,
  NewChatResponse,
} from '@/api/chatAPI/chatAPI.types'
import { GenericAbortSignal } from 'axios'

export const getChatSections = async (params: ChatSectionRequest, signal?: GenericAbortSignal) => {
  const result: ChatSectionResponse = await axios.get('/get_chat_section', { params, signal })

  return result
}

export const editChatSectionName = async (data: EditChatSectionNameRequest) => {
  return await axios.put('/update_name_chat_section', data)
}

export const getChatMessages = async (params: MessagesRequest) => {
  const result: MessagesResponse = await axios.get('/get_history_chat', { params })

  return result
}

export const createChatSection = async (body: NewChatRequest) => {
  const result: NewChatResponse = await axios.post('/create_chat_section', body)

  return result
}

export const createAnwserQuestion = async (body: NewAnwserQuestionRequest) => {
  const result: Message = await axios.post('/answer_question', body)
  return result
}

export const getInfoChatSection = async (params: InfoChatSectionRequest) => {
  const result: InfoChatSectionResponse = await axios.get('/get_info_chat_section', { params })
  return result
}
export const deleteChatSection = async (params: DeleteChatSectionRequest) => {
  const result: number = await axios.delete('/delete_chat_section', { params })
  return result
}