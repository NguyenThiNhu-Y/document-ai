import { useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useVariableInfinite } from '@/hooks/useVariableInfinite'
import { Flex } from '@radix-ui/themes'
import { MessageListProps, VariableSizeListStyled, MessageRow } from './MessageList'

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const { listRef, setRowHeight, getRowHeight } = useVariableInfinite()

  const scrollToBottom = () => {
    listRef.current?.scrollToItem(messages.length - 1, 'end')
  }

  useEffect(() => {
    messages.length > 0 && scrollToBottom()
    // eslint-disable-next-line
  }, [messages])

  return (
    <>
      {isLoading && (
        <Flex justify={'center'} height={'9'}>
          <Ring size={20} lineWeight={2} speed={2} color={colors.slate12} />
        </Flex>
      )}
      <AutoSizer>
        {({ width, height }) => (
          <VariableSizeListStyled
            width={width}
            height={height}
            itemCount={messages.length}
            itemSize={getRowHeight}
            ref={listRef}
          >
            {(props) => {
              return (
                <MessageRow {...props} data={messages[props.index]} setRowHeight={setRowHeight} />
              )
            }}
          </VariableSizeListStyled>
        )}
      </AutoSizer>
    </>
  )
}
