import styled from '@emotion/styled'
import { Box, Flex, Grid, Heading, IconButton } from '@radix-ui/themes'
import { ChatBubbleIcon, FileTextIcon, PlusIcon } from '@radix-ui/react-icons'
import UserBottomNav from '@/layout/components/UserBottomNav'
import NavLink from '@/layout/components/NavLink'
import { MouseEvent } from 'react'
import { ChatList } from '@/layout/components/ChatList'
import { useNavigate } from 'react-router-dom'
import { PiNotebook } from 'react-icons/pi'

const SideBar = () => {
  const navigate = useNavigate()

  const onNewChat = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/new-chat')
  }

  return (
    <GridStyled rows={'auto 1fr auto'} columns={'1'} position={'sticky'} top={'0'}>
      <Box px={'4'} py='5'>
        <Heading size={'3'}>Document AI</Heading>
      </Box>
      <Flex direction={'column'} p={'4'} pt={'0'} gap={'1'}>
        <NavLink to={'/documents'}>
          <FileTextIcon width={18} height={18} />
          Quản lý tài liệu
        </NavLink>
        <NavLink to={'/notes'}>
          <PiNotebook size={'18'} />
          Quản lý ghi chú
        </NavLink>
        <NavLink to={'/new-chat'}>
          <ChatBubbleIcon width={16} height={16} />
          Hỏi đáp
          <IconButton size={'1'} variant='ghost' ml={'auto'} onClick={onNewChat}>
            <PlusIcon />
          </IconButton>
        </NavLink>
        <FlexItem>
          <ChatList />
        </FlexItem>
      </Flex>
      <UserBottomNav />
    </GridStyled>
  )
}

const GridStyled = styled(Grid)((props) => ({
  borderRight: `1px solid ${props.theme.colors.gray5}`,
  height: '100vh',
  backgroundColor: props.theme.colors.gray2,
}))

const FlexItem = styled.div({
  flex: 1,
  paddingLeft: '16px',
})

export default SideBar
