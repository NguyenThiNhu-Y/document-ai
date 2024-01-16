import { Flex, Grid } from '@radix-ui/themes'
import NoteItem from '@/pages/notes/components/NoteItem'
import { Ring } from '@uiball/loaders'
import { useEffect } from 'react'
import { NoteRequest } from '@/api/noteAPI/noteAPI.type'
import { useNotesShareWithYou } from '@/api/noteAPI/noteAPI.hooks'
import { useInView } from 'react-intersection-observer'
import { useTheme } from '@emotion/react'

export interface NoteItemRespon {
  id: number
  title: string
  content: string
}

type NoteShareListType = {
  pagination: NoteRequest
}

export const NoteSharedList: React.FC<NoteShareListType> = ({ pagination }) => {
  // const idUser = localStorage.getItem('DOCUMENT_AI_USER')
  // const [pagination] = useState<NoteRequest>({
  //   iduser: idUser ? +idUser : 0,
  //   current_page: 1,
  //   page_size: 10,
  // })
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useNotesShareWithYou(pagination)

  const { ref, inView } = useInView()
  const { colors } = useTheme()
  useEffect(() => {
    inView && hasNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])
  return (
    <>
      <Grid columns={'3'} py={'6'} gap={'4'}>
        {data?.pages.map((page) =>
          page.notes.map((note, i) => (
            <NoteItem
              key={note.idnote}
              ref={page.notes.length === i + 1 ? ref : undefined}
              {...note}
            />
          ))
        )}
      </Grid>
      <Flex justify={'center'} height={'9'}>
        {(isFetchingNextPage || isLoading) && (
          <Ring size={40} lineWeight={5} speed={2} color={colors.slate12} />
        )}
      </Flex>
    </>
  )
}
