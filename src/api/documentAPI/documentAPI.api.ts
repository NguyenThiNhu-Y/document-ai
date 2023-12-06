import axios from '@/api/axios'
import {
  DocumentRequest,
  DocumentResponse,
  DocumentSummaryRequest,
  DocumentSummary,
  DocumentDeleteRequest
} from '@/api/documentAPI/documentAPI.types'

export const getDocuments = async (params: DocumentRequest) => {
  const result: DocumentResponse = await axios.get('/documents', { params })
  return result
}

export const getDocumentSummary = async (params: DocumentSummaryRequest) => {
  const result: DocumentSummary[] = await axios.get('/get_summary/'+ params.iddocument)
  return result
}

export const deleteDocument = async (params: DocumentDeleteRequest) => {
  const result: number = await axios.delete('/delete_document/' + params.iddocument)
  return result
}

export const uploadDocument = async (files: FormData) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }
  await axios.post('/upload-files', files, config)
  return "ok"
}