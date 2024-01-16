import { useNotes } from '@/api/noteAPI/noteAPI.hooks'
import { NoteRequest } from '@/api/noteAPI/noteAPI.type'
import { useTheme } from '@emotion/react'
import { Grid, Flex } from '@radix-ui/themes'
import { Ring } from '@uiball/loaders'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import NoteItem from '@/pages/notes/components/NoteItem'

type NotePinnedListType = {
  pagination: NoteRequest
}

export const NotePinnedList: React.FC<NotePinnedListType> = ({ pagination }) => {
  // const idUser = localStorage.getItem('DOCUMENT_AI_USER')
  const [paginationPinned] = useState<NoteRequest>({
    pinned: 1,
    iduser: pagination.iduser,
    current_page: pagination.current_page,
    page_size: pagination.page_size,
    keyword: pagination.keyword,
  })
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useNotes(paginationPinned)

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
