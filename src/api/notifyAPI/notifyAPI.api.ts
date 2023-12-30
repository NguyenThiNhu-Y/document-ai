import {
  NotifyChatSectionRequest,
  NotifyIsClickRequest,
  NotifyIsReadRequest,
  NotifyNoteRequest,
  NotifyRequest,
  NotifyResponse,
} from '@/api/notifyAPI/notifyAPI.types'
import axios from '@/api/axios'

export const createNotifyChatsection = async (params: NotifyChatSectionRequest) => {
  const result: number = await axios.post('/create_notify_chatsection', params)
  return result
}

export const createNotifyNote = async (params: NotifyNoteRequest) => {
  const result: number = await axios.post('/create_notify_note', params)
  return result
}

export const getAllNotify = async (params: NotifyRequest) => {
  const result: NotifyResponse = await axios.get('/get_all_notify', { params })
  return result
}

export const getNotifyIsNoteRead = async (params: NotifyIsReadRequest) => {
  const result: number = await axios.get('/get_notify_is_not_read', { params })
  return result
}

export const updateNotifyIsRead = async (params: NotifyIsReadRequest) => {
  const result: number = await axios.put('/update_isread', params)
  return result
}

export const updateNotifyIsClick = async (params: NotifyIsClickRequest) => {
  const result: number = await axios.put('/update_isclick', params)
  return result
}
