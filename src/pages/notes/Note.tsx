import { Container } from '@radix-ui/themes'
import NotesHeader from '@/pages/notes/components/NotesHeader'
import { NoteTab } from '@/pages/notes/components/NoteTab'

const Note = () => {
  return (
    <Container size='3' pt={'9'}>
      <NotesHeader />
      <NoteTab />
    </Container>
  )
}

export default Note
