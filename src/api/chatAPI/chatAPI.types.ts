import { BasePaginationRequest, BasePaginationResponse } from '@/api/common.types'

export interface ChatSection {
  idchat_section: number
  name: string
  created: string
  iduser: number
  iddocument: number
}

export interface ChatSectionResponse extends BasePaginationResponse {
  chat_sections: ChatSection[]
}

export interface ChatSectionRequest extends BasePaginationRequest {
  iduser: number
}

export interface EditChatSectionNameRequest extends Pick<ChatSection, 'idchat_section' | 'name'> {}

export interface Message {
  idhistory_chat: number
  question: string
  answer: string
  created_question: string
  created_answer: string
  iduser: number
}

export interface MessagesRequest extends BasePaginationRequest {
  idchat_section: number
}

export interface MessagesResponse extends BasePaginationResponse {
  message: Message[]
}

export interface NewChatRequest {
  name: string
  iduser: number
  question: string
}

export interface NewChatRequestWithTmpChatId extends NewChatRequest {
  idchat_section: number
  iddocument: number
}

export interface NewChatResponse extends ChatSection, Message {
  question: string
  answer: string
  created_question: string
  created_answer: string
}

export interface NewAnwserQuestionRequest {
  idchat_section: number
  iduser: number
  question: string
}

export interface InfoChatSectionRequest {
  idchat_section: number
}

export interface DeleteChatSectionRequest {
  idchat_section: number
}

export interface InfoChatSectionResponse extends ChatSection {
  document_name: number
}
