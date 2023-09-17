export interface BasePaginationResponse {
  page_size: number
  current_page: number
  total: number
}

export interface BasePaginationRequest {
  page_size: number
  current_page: number
}
