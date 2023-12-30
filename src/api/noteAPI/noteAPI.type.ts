import { BasePaginationRequest, BasePaginationResponse } from '@/api/common.types'

export interface Note {
  idnote: number
  title: string
  content: string
  pined: number
  iduser: number
  created: string
}

export interface NoteResponse extends BasePaginationResponse {
  notes: Note[]
}

export interface NoteRequest extends BasePaginationRequest {
  iduser: number
  pinned?: number
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
}

export interface DeleteNoteRequest {
  idnote: number
}

export interface ShareNoteRequest {
  iduseradd: number
  idnote: number
  list_iduser: number[]
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
