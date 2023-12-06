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
