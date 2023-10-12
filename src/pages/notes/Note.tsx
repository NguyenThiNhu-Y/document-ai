import NoteCreate from './components/NoteCreate'
import { Container } from '@radix-ui/themes'
import { NoteList } from './components/NoteList'

const Note = () => {
  return (
    <Container size='3' pt={'9'}>
      <NoteCreate />
      <NoteList />
    </Container>
  )
}

// const Container = styled.div({
//   display: 'grid',
//   gridTemplateColumns: '1fr 240px',
// })

export default Note
