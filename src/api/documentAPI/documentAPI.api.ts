import axios from '@/api/axios'
import {
  DocumentRequest,
  DocumentResponse,
  DocumentSummaryRequest,
  DocumentSummary,
  DocumentDeleteRequest,
  NameDocumentRequest,
  NameDocumentResponse,
  IdDocumentRequest,
} from '@/api/documentAPI/documentAPI.types'

export const getDocuments = async (params: DocumentRequest) => {
  const result: DocumentResponse = await axios.get('/documents', { params })
  return result
}

export const getDocumentSummary = async (params: DocumentSummaryRequest) => {
  const result: DocumentSummary[] = await axios.get('/get_summary/' + params.iddocument)
  return result
}

export const deleteDocument = async (params: DocumentDeleteRequest) => {
  const result: number = await axios.delete('/delete_document/' + params.iddocument)
  return result
}

export const uploadDocument = async ({ files, idUser }: { files: FormData; idUser: number }) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }
  await axios.post(`/upload-files/${'' + idUser}`, files, config)
  return 'ok'
}

export const getNameDocument = async (params: NameDocumentRequest) => {
  const result: NameDocumentResponse[] = await axios.get('/name_documents/' + params.iduser)
  return result
}

export const getName = async (params: IdDocumentRequest) => {
  const result: string = await axios.get('/get_name/' + params.iddocument)
  return result
}
