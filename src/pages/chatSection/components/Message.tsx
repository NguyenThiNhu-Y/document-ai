import { Message } from '@/api/chatAPI/chatAPI.types'
import { Avatar, Container, Flex, HoverCard } from '@radix-ui/themes'
import { DotPulse } from '@uiball/loaders'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

interface MessageProps extends Message {}

const MessageItem = ({ answer, question, idhistory_chat }: MessageProps) => {
  const { colors } = useTheme()
  const storedUserInfoString = localStorage.getItem('DOCUMENT_AI_USER_INFO')
  let username = ''
  let avatar = ''
  if (storedUserInfoString) {
    // Convert the JSON string to an object
    const storedUserInfo = JSON.parse(storedUserInfoString)
    username = storedUserInfo.username
    avatar = storedUserInfo.avatar
  }

  return (
    <>
      <HoverCard.Root>
        <Container size={'3'} py={'2'} className='hover:cursor-default'>
          <Flex direction={'column'} gap={'4'}>
            <Flex gap={'2'} pl={'8'}>
              <UserMsg>{question}</UserMsg>
              {avatar ? (
                <Avatar fallback={username.charAt(0)} src={avatar} alt={username} radius='full' />
              ) : (
                <Avatar fallback={username.charAt(0)} variant={'soft'} />
              )}
            </Flex>
            <HoverCard.Trigger>
              <Flex gap={'2'} pr={'8'}>
                <Avatar fallback={''} radius='full' src='http://localhost:3000/bot.jpg' />
                <ChatBotMsg>
                  {answer ? answer : <DotPulse size={20} speed={1.3} color={colors.slate1} />}
                </ChatBotMsg>
              </Flex>
            </HoverCard.Trigger>
          </Flex>
        </Container>

        <HoverCard.Content>
          <a
            href={'http://localhost:8000/get_contenthighlight?idhistory_chat=' + idhistory_chat}
            target='_blank'
          >
            Xem chi tiết
          </a>
        </HoverCard.Content>
      </HoverCard.Root>
    </>
  )
}

const MessageBase = styled.div({
  padding: '16px',
  borderRadius: '16px',
  fontSize: '14px',
})

const ChatBotMsg = styled(MessageBase)((props) => ({
  backgroundColor: props.theme.colors.irisA11,
  color: props.theme.colors.slate1,
  borderTopLeftRadius: '4px',
  marginRight: 'auto',
}))

const UserMsg = styled(MessageBase)((props) => ({
  border: `2px solid ${props.theme.colors.slate5}`,
  borderTopRightRadius: '4px',
  marginLeft: 'auto',
  color: props.theme.colors.slate12,
}))

export default MessageItem
