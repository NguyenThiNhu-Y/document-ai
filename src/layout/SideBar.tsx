import styled from '@emotion/styled'
import { Box, Button, Dialog, Flex, Grid, Heading, IconButton, Select } from '@radix-ui/themes'
import { ChatBubbleIcon, FileTextIcon, PlusIcon } from '@radix-ui/react-icons'
import UserBottomNav from '@/layout/components/UserBottomNav'
import NavLink from '@/layout/components/NavLink'
import { useState } from 'react'
import { ChatList } from '@/layout/components/ChatList'
import { useNavigate } from 'react-router-dom'
import { PiNotebook } from 'react-icons/pi'
import { useNameDocument } from '@/api/documentAPI/documentAPI.hooks'
import { FaBell } from 'react-icons/fa'

// import { createPortal } from 'react-dom'
// import { DialogCustom } from '@/components/Dialog'

const SideBar = () => {
  const navigate = useNavigate()
  // const portalContainer = document.getElementById('root')
  // const [isShowDialog, setIsShowDialog] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState(-1)
  const iduser = 1
  const { data } = useNameDocument({ iduser: iduser })

  const onNewChat = () => {
    // e.preventDefault()
    navigate('/new-chat/' + selectedDocId)
  }

  const handleChangeDocId = (value: string) => {
    setSelectedDocId(+value)
  }

  return (
    <GridStyled rows={'auto 1fr auto'} columns={'1'} position={'sticky'} top={'0'}>
      <Box px={'4'} py='5'>
        <Flex>
          <Heading size={'3'}>Document AI</Heading>
          <Flex ml={'auto'} gap={'5'}>
            <button style={{ position: 'relative' }}>
              <FaBell size={14} />
              <NotifyCount>1</NotifyCount>
            </button>
          </Flex>
        </Flex>
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
        <NavLink to={'/new-chat/' + selectedDocId}>
          <ChatBubbleIcon width={16} height={16} />
          Hỏi đáp
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton size={'1'} variant='ghost' ml={'auto'}>
                <PlusIcon />
              </IconButton>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Description>Chọn loại tài liệu bạn muốn tạo ChatBot</Dialog.Description>

              <Flex direction='column' gap='3' my='3'>
                <Select.Root value={String(selectedDocId)} onValueChange={handleChangeDocId}>
                  <Select.Trigger />
                  <Select.Content position='popper'>
                    <Select.Item value='-1'>Tất cả</Select.Item>
                    {data?.map((document) => (
                      <Select.Item value={String(document.iddocument)}>{document.name}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex gap='3' mt='4' justify='end'>
                <Dialog.Close>
                  <Button variant='soft' color='gray'>
                    Đóng
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={onNewChat}>Chọn</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
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

const NotifyCount = styled.span({
  position: 'absolute',
  top: -1,
  left: 5,
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '50%',
  fontSize: '7px',
  fontWeight: 'bold',
  width: '11px',
  height: '11px',
  justifyContent: 'center',
})

export default SideBar
