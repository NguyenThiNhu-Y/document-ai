import styled from '@emotion/styled'
import { NoteItem } from './NoteItem'
import { Box, Grid, Card, Flex } from '@radix-ui/themes'
import { Ring } from '@uiball/loaders'

export interface NoteItemRespon {
  id: number
  title: string
  content: string
}

const noteList: NoteItemRespon[] = [
  {
    id: 1,
    title: 'title 1',
    content: 'content 1',
  },
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
  },
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
  },
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
  },
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
  },
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
  },
]

export const NoteList = () => {
  return (
    <>
      <Grid columns={'3'} py={'6'} gap={'4'}>
        {noteList.map((note) => (
          <Box height='9'>
            <NoteItem key={note.id} {...note} />
          </Box>
        ))}
      </Grid>
    </>
  )
}

// export const NoteList = () => {
//   return (
//     <List>
//       {noteList.map((note) => (
//         <NoteItem key={note.id} {...note}/>
//       ))}
//     </List>
//   )
// }

const List = styled.div({
  background: 'white',
  borderRadius: 5,
  marginTop: 20,
  border: '1px solid back',
})
