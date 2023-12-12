import { Container } from '@radix-ui/themes'
import DocumentsHeader from '@documentComponents/DocumentsHeader'
import DocumentList from '@documentComponents/DocumentList'
import { ChangeEvent, useState } from 'react'
import { DocumentRequest } from '@/api/documentAPI/documentAPI.types'
import { DEFAULT_PAGINATION } from '@/constants/common'

const Documents = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [pagination, setPagination] = useState<DocumentRequest>(DEFAULT_PAGINATION)
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
