import styled from '@emotion/styled'
import EditAbleNavLink from '@/layout/components/EditAbleNavLink'
import { useCallback, useMemo, useState } from 'react'
import { useChatSections } from '@/api/chatAPI/chatAPI.hooks'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Skeleton from 'react-loading-skeleton'
import { Flex } from '@radix-ui/themes'
import { Ring } from '@uiball/loaders'
import { useTheme } from '@emotion/react'
import { DialogCustom } from '@/components/Dialog'
import { createPortal } from 'react-dom'

export const ChatList = () => {
  const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useChatSections()
  const { colors } = useTheme()
  const [isShowDialog, setIsShowDialog] = useState(false)

  const chatSections = useMemo(
    () => data?.pages.flatMap((page) => page.chat_sections) ?? [],
    [data]
  )

  const itemCount = hasNextPage ? chatSections.length + 1 : chatSections.length

  const onRemoveChat = useCallback(() => {
    console.log('remove')
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadMore = async (_: number, __: number) => {
    if (!isFetchingNextPage) await fetchNextPage()
  }

  const CheckItemLoaded = (index: number) => !hasNextPage || index < chatSections.length

  if (isFetching && !itemCount)
    return (
      <Flex justify={'center'} height={'9'}>
        <Ring size={20} lineWeight={2} speed={2} color={colors.slate12} />
      </Flex>
    )

  return (
    <>
      {isShowDialog &&
        createPortal(
          <DialogCustom
            message='Bạn có chắc chắn muốn xóa cuộc trò chuyện này không ?'
            setIsShowDialog={setIsShowDialog}
          />,
          document.body
        )}
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isItemLoaded={CheckItemLoaded}
            itemCount={itemCount}
            loadMoreItems={handleLoadMore}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeListStyled
                width={width}
                height={height}
                itemSize={36}
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {(props) => (
                  <RowItem style={props.style}>
                    {CheckItemLoaded(props.index) ? (
                      <EditAbleNavLink
                        to={`/chat/${chatSections[props.index].idchat_section}`}
                        onRemove={onRemoveChat}
                        className='chat-section'
                        key={chatSections[props.index].idchat_section}
                        chatSectionID={chatSections[props.index].idchat_section}
                        setIsShowDialog={setIsShowDialog}
                      >
                        {chatSections[props.index]?.name}
                      </EditAbleNavLink>
                    ) : (
                      <Skeleton height={32} baseColor={colors.slate4} />
                    )}
                  </RowItem>
                )}
              </FixedSizeListStyled>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </>
  )
}

const FixedSizeListStyled = styled(FixedSizeList)((props) => ({
  borderLeft: `1px solid ${props.theme.colors.gray5}`,

  '&::-webkit-scrollbar': {
    width: '4px',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: props.theme.colors.grayA3,
    borderRadius: 999,
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: props.theme.colors.grayA8,
    borderRadius: 999,
  },
}))

const RowItem = styled.div({
  padding: '2px 4px',
})
