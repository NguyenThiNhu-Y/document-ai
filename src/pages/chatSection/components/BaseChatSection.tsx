import styled from '@emotion/styled'
import {
  Avatar,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  Select as RadixSelect,
  Text,
} from '@radix-ui/themes'
import MemoMessageList from '@/pages/chatSection/components/MessageList'
import InputBox from '@/pages/chatSection/components/InputBox'
import { Message } from '@/api/chatAPI/chatAPI.types'
import { useParams } from 'react-router-dom'
import { useInfoChatSection } from '@/api/chatAPI/chatAPI.hooks'
import { FaUserPlus } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { useAllUser, useGetUserInGroup } from '@/api/authAPI/auth.hooks'
import { useNameDocument } from '@/api/documentAPI/documentAPI.hooks'
import DialogAddUser from '@/components/Dialog/DialogAddUser'
import { BiSolidGroup } from 'react-icons/bi'
interface BaseChatSectionProps {
  messages: Message[]
  onSubmit: (message: string) => void
  isLoading: boolean
}

interface Option {
  value: string
  label: string
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

  const [selectedOptions, setSelectedOptions] = useState<Option[] | null>(null)
  const [isShowDialog, setIsShowDialog] = useState(false)

  const [keyword, setKeyword] = useState<string>('')

  const { data: dataUser } = useAllUser({ keyword: '' })
  const { data: dataUserInGroup } = useGetUserInGroup({ idchatsection: +chatID })
  console.log('data', dataUserInGroup)
  let optionList: Option[] = []
  if (dataUser) {
    optionList = dataUser.map((user) => {
      return { value: '' + user.iduser, label: user.email }
    })
  }

  const handleSelect = (newValue: MultiValue<Option>) => {
    setSelectedOptions(newValue as Option[]) // You might need to do some type casting
  }

  const handleChangeInput = (newValue: string) => {
    setKeyword(newValue)
  }

  return (
    <>
      {isShowDialog && (
        <DialogAddUser
          setIsShowDialog={setIsShowDialog}
          title='Tìm người dùng muốn thêm vào cuộc trò chuyện'
          value={selectedOptions}
        >
          <div>
            {dataUser && (
              <Select
                className='text-left text-sm'
                options={keyword == '' ? [] : optionList}
                placeholder='Nhập email'
                value={selectedOptions}
                onChange={handleSelect}
                inputValue={keyword}
                onInputChange={handleChangeInput}
                isSearchable={true}
                isMulti
              />
            )}
          </div>
        </DialogAddUser>
      )}
      <Wrapper direction={'column'} align={'center'}>
        <Header>
          <RadixSelect.Root
            value={String(selectedDocId)}
            onValueChange={handleChangeDocId}
            disabled={chatID !== -1}
          >
            <RadixSelect.Trigger />
            <RadixSelect.Content position='popper'>
              <RadixSelect.Item value='-1'>Tất cả tài liệu</RadixSelect.Item>
              {documents?.map((document) => (
                <RadixSelect.Item value={String(document.iddocument)}>
                  {document.name}
                </RadixSelect.Item>
              ))}
            </RadixSelect.Content>
          </RadixSelect.Root>
          <div
            className='absolute top-[50%] right-12 flex items-center mr-3 p-2'
            style={{
              transform: 'translateY(-50%)',
            }}
          >
            <DropdownMenu.Root>
              {dataUserInGroup && dataUserInGroup?.length > 0 && (
                <DropdownMenu.Trigger>
                  <Button style={{ backgroundColor: '#00003B0D', color: 'gray' }}>
                    <span>{dataUserInGroup?.length}</span>
                    <BiSolidGroup size={20} />
                  </Button>
                </DropdownMenu.Trigger>
              )}
              <DropdownMenu.Content>
                {dataUserInGroup?.map((user, index) => (
                  <>
                    <DropdownMenuItemStyle disabled={true}>
                      <Avatar
                        fallback={user.username.charAt(0)}
                        src={user.avatar}
                        variant={'soft'}
                        radius='full'
                        mr={'4'}
                      />
                      <Flex direction={'column'} mr={'auto'}>
                        <Heading size={'1'}>{user.username}</Heading>
                        <Text size={'1'}>{user.email}</Text>
                      </Flex>
                    </DropdownMenuItemStyle>
                    <DropdownMenu.Separator hidden={index == dataUserInGroup?.length - 1} />
                  </>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <div
            className='absolute top-[50%] right-5'
            style={{
              transform: 'translateY(-50%)',
            }}
          >
            <Button onClick={() => setIsShowDialog(true)}>
              <FaUserPlus size={16} />
            </Button>
          </div>
        </Header>
        <FlexFullItem>
          <MemoMessageList messages={messages} isLoading={isLoading} />
        </FlexFullItem>
        <InputWrapper justify={'between'} gap={'3'} align={'center'}>
          <InputBox onSubmit={onSubmit} isLoading={isLoading} />
        </InputWrapper>
      </Wrapper>
    </>
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

const Header = styled.div({
  width: '880px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  padding: '10px 0',
})

const DropdownMenuItemStyle = styled(DropdownMenu.Item)({
  marginTop: '8px',
  marginBottom: '8px',
})
export default BaseChatSection
