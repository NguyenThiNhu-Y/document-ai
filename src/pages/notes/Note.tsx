import { Container } from '@radix-ui/themes'
import NotesHeader from './components/NotesHeader'
import { NoteTab } from './components/NoteTab'

const Note = () => {
  return (
    <Container size='3' pt={'9'}>
      <NotesHeader />
      <NoteTab />
    </Container>
  )
}

// const Container = styled.div({
//   display: 'grid',
//   gridTemplateColumns: '1fr 240px',
// })

export default Note
