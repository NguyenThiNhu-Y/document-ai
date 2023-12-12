import styled from '@emotion/styled'
import { Flex, Heading, TextField } from '@radix-ui/themes'
import MemoMessageList from '@/pages/chatSection/components/MessageList'
import InputBox from '@/pages/chatSection/components/InputBox'
import { Message } from '@/api/chatAPI/chatAPI.types'
import { useParams } from 'react-router-dom'
import { useName } from '@/api/documentAPI/documentAPI.hooks'
import { useInfoChatSection } from '@/api/chatAPI/chatAPI.hooks'

interface BaseChatSectionProps {
  messages: Message[]
  onSubmit: (message: string) => void
  isLoading: boolean
}

const BaseChatSection = ({ messages, onSubmit, isLoading }: BaseChatSectionProps) => {
  const { chatID = -1 } = useParams()
  const { data } = useInfoChatSection({ idchat_section: +chatID })


  return (
    <Wrapper direction={'column'} align={'center'}>
      <Flex py={'3'} align={'baseline'}>
        <Heading size='3' mx='5'>
          {data == null ? 'Tất cả tài liệu' : 'Loại tài liệu: ' + data.document_name}
        </Heading>
      </Flex>
      <FlexFullItem>
        <MemoMessageList messages={messages} isLoading={isLoading} />
      </FlexFullItem>
      <InputWrapper justify={'between'} gap={'3'} align={'center'}>
        <InputBox onSubmit={onSubmit} isLoading={isLoading} />
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)({
  minHeight: '100vh',
  position: 'relative',
})

const InputWrapper = styled(Flex)(
  {
    position: 'absolute',
    bottom: 0,
    paddingBlock: '12px',
    transition: 'border-color 0.3s',
    paddingBottom: '24px',
    width: '880px',
  },
  (props) => ({
    borderTop: `2px solid ${props.theme.colors.slate5}`,
    backgroundColor: props.theme.colors.gray1,

    '&:has(.input:focus)': {
      borderColor: props.theme.colors.iris10,
    },
  })
)

const FlexFullItem = styled.div({
  flex: 1,
  width: '100%',
})

export default BaseChatSection
