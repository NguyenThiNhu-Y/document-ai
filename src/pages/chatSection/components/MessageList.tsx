import { memo, useEffect, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList } from 'react-window'
import MessageComponent from '@/pages/chatSection/components/Message'
import withVariableInfiniteRow from '@/styles/HOCs/withVariableInfiniteRow'
import { useVariableInfinite } from '@/hooks/useVariableInfinite'
import styled from '@emotion/styled'
import { Message } from '@/api/chatAPI/chatAPI.types'
import { Flex } from '@radix-ui/themes'
import { Ring } from '@uiball/loaders'
import { useTheme } from '@emotion/react'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { listRef, setRowHeight, getRowHeight } = useVariableInfinite()
  const { colors } = useTheme()

  const scrollToBottom = () => {
    listRef.current?.scrollTo(containerRef.current?.clientHeight ?? 0)
  }

  useEffect(() => {
    messages.length > 0 && scrollToBottom()
    // eslint-disable-next-line
  }, [messages])

  return (
    <>
      {isLoading && !messages.length && (
        <Flex justify={'center'} height={'9'} align={'center'}>
          <Ring size={28} lineWeight={4} speed={2} color={colors.slate12} />
        </Flex>
      )}
      <AutoSizer>
        {({ width, height }) => (
          <div ref={containerRef}>
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
          </div>
        )}
      </AutoSizer>
    </>
  )
}

const MessageRow = styled(withVariableInfiniteRow(MessageComponent))({
  marginBottom: '16px',
})

const MemoMessageList = memo(MessageList)

const VariableSizeListStyled = styled(VariableSizeList)({
  paddingBottom: '120px',
})

export default MemoMessageList
