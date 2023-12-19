import styled from '@emotion/styled'
import { Flex, Select } from '@radix-ui/themes'
import MemoMessageList from '@/pages/chatSection/components/MessageList'
import InputBox from '@/pages/chatSection/components/InputBox'
import { Message } from '@/api/chatAPI/chatAPI.types'
import { useParams } from 'react-router-dom'
import { useInfoChatSection } from '@/api/chatAPI/chatAPI.hooks'
import { useEffect, useState } from 'react'
import { useNameDocument } from '@/api/documentAPI/documentAPI.hooks'

interface BaseChatSectionProps {
  messages: Message[]
  onSubmit: (message: string) => void
  isLoading: boolean
}

const BaseChatSection = ({ messages, onSubmit, isLoading }: BaseChatSectionProps) => {
  let currentURL = ''
  let iddocument = -1
  useEffect(() => {
    // Get the current URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currentURL = window.location.href
    const urlParts = currentURL.split('/')

    // Get the last part of the URL
    const lastPart = urlParts[urlParts.length - 1]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    iddocument = +lastPart
  }, [])

  const { chatID = -1 } = useParams()
  const { data } = useInfoChatSection({ idchat_section: +chatID })
  if (!currentURL.includes('new-chat')) {
    iddocument = data == null ? -1 : data.iddocument
  }

  console.log('iddocument', iddocument)
  console.log('chatID', chatID)
  const [selectedDocId, setSelectedDocId] = useState(iddocument)
  const iduser = 1
  const { data: documents } = useNameDocument({ iduser: iduser })
  const handleChangeDocId = (value: string) => {
    setSelectedDocId(+value)
  }

  useEffect(() => {
    setSelectedDocId(iddocument)
    // eslint-disable-next-line
  }, [chatID])

  return (
    <Wrapper direction={'column'} align={'center'}>
      <Flex py={'3'} align={'baseline'}>
        <Select.Root
          value={String(selectedDocId)}
          onValueChange={handleChangeDocId}
          disabled={chatID !== -1}
        >
          <Select.Trigger />
          <Select.Content position='popper'>
            <Select.Item value='-1'>Tất cả tài liệu</Select.Item>
            {documents?.map((document) => (
              <Select.Item value={String(document.iddocument)}>{document.name}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
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
