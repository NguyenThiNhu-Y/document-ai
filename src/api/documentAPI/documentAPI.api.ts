import axios from '@/api/axios'
import { DocumentRequest, DocumentResponse } from '@/api/documentAPI/documentAPI.types'

export const getDocuments = async (params: DocumentRequest) => {
  const result: DocumentResponse = await axios.get('/documents', { params })
  return result
}
