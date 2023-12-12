import React from 'react'
import { useDocuments } from '@/api/documentAPI/documentAPI.hooks'

import { Flex, Grid } from '@radix-ui/themes'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import DocumentItem from '@documentComponents/DocumentItem'
import { Ring } from '@uiball/loaders'
import { useTheme } from '@emotion/react'
import { DocumentRequest } from '@/api/documentAPI/documentAPI.types'

type DocumentListType = {
  pagination: DocumentRequest
}
const DocumentList: React.FC<DocumentListType> = ({ pagination }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useDocuments(pagination)
  const { ref, inView } = useInView()
  const { colors } = useTheme()

  useEffect(() => {
    inView && hasNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <>
      <Grid columns={'3'} py={'6'} gap={'4'}>
        {data?.pages.map((page) =>
          page.documents.map((document, i) => (
            <DocumentItem
              key={document.iddocument}
              ref={page.documents.length === i + 1 ? ref : undefined}
              {...document}
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

export default DocumentList
