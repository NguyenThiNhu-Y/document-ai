import axios from '@/api/axios'
import {
  DeleteNoteRequest,
  NewNoteRequest,
  NoteRequest,
  NoteResponse,
  PinNoteRespone,
  ShareNoteRequest,
  UserInNoteResponse,
  UserNoteRequest,
} from '@/api/noteAPI/noteAPI.type'

export const getNotes = async (params: NoteRequest) => {
  const result: NoteResponse = await axios.get('/get_all_note', { params })
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
