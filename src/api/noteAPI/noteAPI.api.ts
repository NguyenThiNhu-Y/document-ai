import axios from '@/api/axios'
import {
  DeleteNoteRequest,
  NewNoteRequest,
  Note,
  NoteRequest,
  NoteResponse,
  PinNoteRespone,
  ShareNoteRequest,
  UpdateNoteRequest,
  UserInNoteRequest,
  UserInNoteRespone,
  UserInNoteResponse,
  UserNotInNoteRequest,
  UserNoteRequest,
  ViewEditNoteRequest,
} from '@/api/noteAPI/noteAPI.type'

export const getNotes = async (params: NoteRequest) => {
  const result: NoteResponse = await axios.get('/get_all_note', { params })
  return result
}

export const getNotesShareWithYou = async (params: NoteRequest) => {
  const result: NoteResponse = await axios.get('/get_note_share_with_you', { params })
  return result
}

export const createNote = async (body: NewNoteRequest) => {
  const result: NoteResponse = await axios.post('/create_note', body)
  return result
}

export const pinNote = async (params: PinNoteRespone) => {
  const result: number = await axios.put('/pin_note/' + params.idnote)
  return result
}

export const deleteNote = async (params: DeleteNoteRequest) => {
  const result: number = await axios.delete('/delete_note/' + params.idnote)
  return result
}

export const shareNote = async (body: ShareNoteRequest) => {
  const result: number = await axios.post('/share_not', body)
  return result
}

export const getUserInNote = async (params: UserNoteRequest) => {
  const result: UserInNoteResponse[] = await axios.get('/get_user_in_note', { params })
  return result
}

export const getNote = async (params: ViewEditNoteRequest) => {
  const result: Note = await axios.get('/get_note', { params })
  return result
}

export const updateNote = async (body: UpdateNoteRequest) => {
  const result: number = await axios.put('/update_note', body)
  return result
}

export const deleteUserInNote = async (body: UserInNoteRequest) => {
  const result: number = await axios.put('/delete_user_in_note', body)
  return result
}

export const getAllUserInNote = async (params: UserNotInNoteRequest) => {
  const result: UserInNoteRespone[] = await axios.get('/get_all_user_note', { params })
  return result
}

export const getIsEdit = async (params: UserInNoteRequest) => {
  const result: number = await axios.get('/get_isedit', { params })
  return result
}
