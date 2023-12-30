import styled from '@emotion/styled'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  IconButton,
  Select,
  Text,
} from '@radix-ui/themes'
import { db } from '@/firebase/firebase'
import { ref, onValue } from 'firebase/database'
import { ChatBubbleIcon, FileTextIcon, PlusIcon } from '@radix-ui/react-icons'
import UserBottomNav from '@/layout/components/UserBottomNav'
import NavLink from '@/layout/components/NavLink'
import { useContext, useState } from 'react'
import { ChatList } from '@/layout/components/ChatList'
import { useNavigate } from 'react-router-dom'
import { PiNotebook } from 'react-icons/pi'
import { useNameDocument } from '@/api/documentAPI/documentAPI.hooks'
import { FaBell } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { NotifyRequest } from '@/api/notifyAPI/notifyAPI.types'
import {
  useGetAllNotify,
  useUpdateNoityIsClick,
  useUpdateNoityIsRead,
} from '@/api/notifyAPI/notifyAPI.hooks'
import { useEffect } from 'react'
import { DEFAULT_PAGINATION } from '@/constants/common'
import { useTheme } from '@emotion/react'
import { APP_CONTEXT } from '@/context'

const SideBar = () => {
  const context = useContext(APP_CONTEXT)
  const [quantityNotification, setQuantityNotification] = useState(0)
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [selectedDocId, setSelectedDocId] = useState(-1)
  const iduser = localStorage.getItem('DOCUMENT_AI_USER')
    ? Number(localStorage.getItem('DOCUMENT_AI_USER'))
    : 0
  const { data } = useNameDocument({ iduser: iduser })

  const onNewChat = () => {
    // e.preventDefault()
    navigate('/new-chat/' + selectedDocId)
  }

  const handleChangeDocId = (value: string) => {
    setSelectedDocId(+value)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pagination] = useState<NotifyRequest>(DEFAULT_PAGINATION)
  const { data: dataNotify } = useGetAllNotify(pagination)

  const { mutate: mutateNotifyIsClick } = useUpdateNoityIsClick()

  const onClickNotify = (id_chatsection: number, idnote: number, idnotify: number) => {
    console.log(id_chatsection, idnote)
    mutateNotifyIsClick({ idnotify: idnotify })
    if (id_chatsection) {
      navigate('/chat/' + id_chatsection)
    }
  }

  const { mutate: mutateNotifyIsRead } = useUpdateNoityIsRead()
  const onReadNotify = () => {
    mutateNotifyIsRead({ iduser: iduser })
  }
  useEffect(() => {
    if (context.userData?.iduser) {
      const databaseRef = ref(db, `notify/${context.userData?.iduser}`)
      const unsubscribe = onValue(databaseRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          setQuantityNotification(childSnapshot.val())
        })
      })
      return () => {
        unsubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <GridStyled rows={'auto 1fr auto'} columns={'1'} position={'sticky'} top={'0'}>
      <Box px={'4'} py='5'>
        <Flex>
          <Heading size={'3'}>Document AI</Heading>
          <Flex ml={'auto'} gap={'5'}>
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger>
                <button style={{ position: 'relative' }} onClick={onReadNotify}>
                  <FaBell size={14} />
                  {quantityNotification > 0 && <NotifyCount>{quantityNotification}</NotifyCount>}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {dataNotify?.pages.map((page) =>
                  page.notifies.map((notify) => (
                    <>
                      <CenteredFlex>
                        <DivNotifyStyle
                          style={{ backgroundColor: notify.isclick == 0 ? colors.irisA3 : '' }}
                          onClick={() => {
                            onClickNotify(notify.idchatsection, notify.idnote, notify.idnotify)
                          }}
                        >
                          <Avatar
                            fallback=''
                            src={notify.avatar_useradd}
                            variant={'soft'}
                            radius='full'
                            mr={'2'}
                            style={{ width: '30px', height: '30px' }}
                          />
                          <Text size={'1'}>
                            <strong>{notify.username_useradd + ' '}</strong>
                            <span>{notify.content}</span>
                          </Text>
                          <IconButton size={'1'} variant='ghost' m={'2'}>
                            <RxCross2 size={'12'} color={'gray'} />
                          </IconButton>
                        </DivNotifyStyle>
                      </CenteredFlex>
                    </>
                  ))
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
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
                    {data?.map((document, index) => (
                      <Select.Item key={index} value={String(document.iddocument)}>
                        {document.name}
                      </Select.Item>
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

const CenteredFlex = styled.div({
  display: 'flex',
  marginBottom: 8,
  alignItems: 'center',
})

const DivNotifyStyle = styled.button((props) => ({
  padding: 2,
  '&:hover': {
    backgroundColor: props.theme.colors.irisA3,
  },
}))

export default SideBar
