import { BasePaginationRequest, BasePaginationResponse } from '@/api/common.types'
export interface NotifyChatSectionRequest {
  iduser: number
  iduseradd: number
  idchatsection: number
  content: string
}

export interface NotifyNoteRequest {
  iduser: number
  iduseradd: number
  idnote: number
  content: string
}

export interface NotifyRequest extends BasePaginationRequest {
  iduser: number
}

export interface Notify {
  idnotify: number
  iduser: number
  iduseradd: number
  username_useradd: string
  avatar_useradd: string
  idchatsection: number
  idnote: number
  content: string
  isread: number
  isclick: number
}

export interface NotifyResponse extends BasePaginationResponse {
  notifies: Notify[]
}

export interface NotifyIsReadRequest {
  iduser: number
}

export interface NotifyIsClickRequest {
  idnotify: number
}
