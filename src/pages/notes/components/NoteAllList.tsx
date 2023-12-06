import { NoteRequest } from '@/api/noteAPI/noteAPI.type'
import { Flex, Grid } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { DEFAULT_PAGINATION } from '@/constants/common'
import { useNotes } from '@/api/noteAPI/noteAPI.hooks'
import { useInView } from 'react-intersection-observer'
import { Ring } from '@uiball/loaders'
import { useTheme } from '@emotion/react'
import NoteItem from './NoteItem'

export const NoteAllList = () => {
  const [pagination] = useState<NoteRequest>(DEFAULT_PAGINATION)
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useNotes(pagination)

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
