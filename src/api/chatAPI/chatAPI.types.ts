import { BasePaginationRequest, BasePaginationResponse } from '@/api/common.types'

export interface ChatSection {
  idchat_section: number
  name: string
  created: string
  iduser: number
}

export interface ChatSectionResponse extends BasePaginationResponse {
  chat_sections: ChatSection[]
}

export interface ChatSectionRequest extends BasePaginationRequest {
  iduser: number
}

export interface EditChatSectionNameRequest extends Pick<ChatSection, 'idchat_section' | 'name'> {}
