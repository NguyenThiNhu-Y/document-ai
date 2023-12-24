import styled from '@emotion/styled'
import { Flex, Heading } from '@radix-ui/themes'
import MemoMessageList from '@/pages/chatSection/components/MessageList'
import InputBox from '@/pages/chatSection/components/InputBox'
import { Message } from '@/api/chatAPI/chatAPI.types'
import { useParams } from 'react-router-dom'
import { useInfoChatSection } from '@/api/chatAPI/chatAPI.hooks'
import { FaUserPlus } from 'react-icons/fa6'
import { useState } from 'react'
import Select, { MultiValue } from 'react-select'
import Dialog from '@/components/Dialog/Dialog'
import { useAllUser } from '@/api/authAPI/auth.hooks'

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
  const { chatID = -1 } = useParams()
  const { data } = useInfoChatSection({ idchat_section: +chatID })

  const [selectedOptions, setSelectedOptions] = useState<Option[] | null>(null)
  const [isShowDialog, setIsShowDialog] = useState(false)

  const [keyword, setKeyword] = useState<string>('')

  const { data: dataUser } = useAllUser({ keyword: '' })
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
        <Dialog
          setIsShowDialog={setIsShowDialog}
          title='Tìm người dùng muốn thêm vào cuộc trò chuyện'
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
        </Dialog>
      )}
      <Wrapper direction={'column'} align={'center'}>
        <Header>
          <Heading size='3' mx='5'>
            {data == null ? 'Tất cả tài liệu' : 'Loại tài liệu: ' + data.document_name}
          </Heading>
          <div
            className='absolute top-[50%] right-5'
            style={{
              transform: 'translateY(-50%)',
            }}
          >
            <button
              onClick={() => setIsShowDialog(true)}
              className='text-main-color hover:main-color-hover rounded p-2 '
            >
              <FaUserPlus />
            </button>
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

export default BaseChatSection
