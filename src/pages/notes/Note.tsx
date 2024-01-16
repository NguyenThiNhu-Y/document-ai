import { Container } from '@radix-ui/themes'
import NotesHeader from '@/pages/notes/components/NotesHeader'
import { NoteTab } from '@/pages/notes/components/NoteTab'
import { ChangeEvent, useState } from 'react'
import { NoteRequest } from '@/api/noteAPI/noteAPI.type'
import { PAGE_LIMIT } from '@/api/common.constants'

const Note = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const iduser = localStorage.getItem('DOCUMENT_AI_USER')
    ? Number(localStorage.getItem('DOCUMENT_AI_USER'))
    : 0
  const [pagination, setPagination] = useState<NoteRequest>({
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
      <NotesHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleSearchChange={handleSearchChange}
      />
      <NoteTab pagination={pagination} />
    </Container>
  )
}

export default Note
