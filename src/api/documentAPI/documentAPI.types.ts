import { BasePaginationRequest, BasePaginationResponse } from '@/api/common.types'

export interface Document {
  iddocument: number
  name: string
  size: number
  directory: string
  created: string
}

export interface DocumentResponse extends BasePaginationResponse {
  documents: Document[]
}

export interface DocumentRequest extends BasePaginationRequest {
  iduser: number
  keyword: string
}

export interface DocumentSummaryRequest {
  iddocument: number
}

export interface DocumentSummary {
  idsummary_document: number
  iddocument: number
  summary: string
}

export interface DocumentSummaryResponse {
  summaries: DocumentSummary[]
}

export interface DocumentDeleteRequest {
  iddocument: number
}

export interface IdDocumentRequest {
  iddocument: number
}

export interface NameDocumentRequest {
  iduser: number
}

export interface NameDocumentResponse {
  iddocument: number
  name: string
}
