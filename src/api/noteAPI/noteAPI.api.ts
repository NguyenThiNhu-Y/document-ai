import axios from '@/api/axios'
import { DeleteNoteRequest, NewNoteRequest, NoteRequest, NoteResponse, PinNoteRespone } from "./noteAPI.type"

export const getNotes = async (params: NoteRequest) => {
  const result: NoteResponse = await axios.get('/get_all_note', { params })
  return result
}

export const createNote = async (body: NewNoteRequest) => {
  const result: NoteResponse = await axios.post('/create_note', body)
  return result
}

export const pinNote = async (params: PinNoteRespone) => {
  const result: number = await axios.put('/pin_note/'+ params.idnote)
  return result
}

export const deleteNote = async (params: DeleteNoteRequest) => {
  const result: number = await axios.delete('/delete_note/'+ params.idnote)
  return result
}


