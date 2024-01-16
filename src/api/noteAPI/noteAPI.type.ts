import { BasePaginationRequest, BasePaginationResponse } from '@/api/common.types'

export interface Note {
  idnote: number
  title: string
  content: string
  pined: number
  iduser: number
  created: string
  isdeleted: number
}

export interface NoteResponse extends BasePaginationResponse {
  notes: Note[]
}

export interface NoteRequest extends BasePaginationRequest {
  iduser: number
  pinned?: number
  keyword?: string
}

export interface NewNoteRequest {
  iduser: number
  title: string
  content: string
}

export interface NewNoteRespone {
  idnote: number
}

export interface PinNoteRespone {
  idnote: number
  iduser: number
}

export interface DeleteNoteRequest {
  idnote: number
}

export interface ShareNoteRequest {
  iduseradd: number
  idnote: number
  list_iduser: number[]
  isedit: number
}

export interface UserNoteRequest {
  idnote: number
}

export interface UserInNoteResponse {
  iduser: number
  username: string
  email: string
  avatar: string
}

export interface ViewEditNoteRequest {
  idnote: number
}

export interface UpdateNoteRequest {
  idnote: number
  title: string
  content: string
}

export interface UserInNoteRequest {
  idnote: number
  iduser: number
}

export interface UserNotInNoteRequest {
  keyword: string
  idnote: number
}

export interface UserInNoteRespone {
  iduser: number
  email: string
}
