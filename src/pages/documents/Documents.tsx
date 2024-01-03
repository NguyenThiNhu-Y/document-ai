import { Container } from '@radix-ui/themes'
import DocumentsHeader from '@documentComponents/DocumentsHeader'
import DocumentList from '@documentComponents/DocumentList'
import { ChangeEvent, useState } from 'react'
import { DocumentRequest } from '@/api/documentAPI/documentAPI.types'
import { PAGE_LIMIT } from '@/api/common.constants'

const Documents = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const iduser = localStorage.getItem('DOCUMENT_AI_USER')
    ? Number(localStorage.getItem('DOCUMENT_AI_USER'))
    : 0
  const [pagination, setPagination] = useState<DocumentRequest>({
    iduser: iduser,
    page_size: PAGE_LIMIT,
    current_page: 1,
    keyword: searchKeyword,
  })
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
    setPagination({
      ...pagination,
      keyword: event.target.value,
    })
  }

  return (
    <Container size='3' pt={'9'}>
      <DocumentsHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleSearchChange={handleSearchChange}
      />
      <DocumentList pagination={pagination} />
    </Container>
  )
}

export default Documents
