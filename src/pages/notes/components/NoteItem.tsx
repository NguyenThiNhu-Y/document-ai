import styled from '@emotion/styled'
import { Button, Card, Dialog, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import Line from '@/components/Line'
import { GoPeople, GoPerson } from 'react-icons/go'
import { BsCalendar4Event, BsPinAngleFill } from 'react-icons/bs'
import { BsPinAngle } from 'react-icons/bs'
import { ForwardedRef, forwardRef, useState } from 'react'
import { Note } from '@/api/noteAPI/noteAPI.type'
import { formatDateTime } from '@/utils/datetime'
import {
  useAllUserInNote,
  useDeleteNote,
  useGetUserInNote,
  usePinNote,
} from '@/api/noteAPI/noteAPI.hooks'
import { PiShareFatLight } from 'react-icons/pi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Select, { MultiValue } from 'react-select'
import DialogShare from '@/pages/notes/components/DialogShare'
import { useNavigate } from 'react-router-dom'

interface NoteItemProps extends Note {}
interface Option {
  value: string
  label: string
}

const NoteItem = forwardRef(
  (
    { idnote, title, content, created, pined }: NoteItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const navigate = useNavigate()
    const { mutate } = usePinNote()
    const { mutate: mutateDelete } = useDeleteNote()

    const onPinned = () => {
      mutate({
        idnote: idnote,
      })
    }

    const onDelete = () => {
      mutateDelete({
        idnote: idnote,
      })
    }
    const [isShowDialog, setIsShowDialog] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<Option[] | null>(null)
    const [keyword, setKeyword] = useState<string>('')

    const { data: dataUser } = useAllUserInNote({ idnote: idnote, keyword: '' })
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

    const { data: dataUserInNote } = useGetUserInNote({ idnote: idnote })

    function formatDateToDDMMYYYY(dateString: string) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng bắt đầu từ 0
      const year = date.getFullYear()
      const formattedDate = `${day}.${month}.${year}`
      return formattedDate
    }
    return (
      <>
        {isShowDialog && (
          <DialogShare
            setIsShowDialog={setIsShowDialog}
            title='Tìm người dùng muốn chia sẻ ghi chú'
            value={selectedOptions}
            idnote={idnote}
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
          </DialogShare>
        )}
        <Dialog.Root>
          <CardStyled>
            <Flex ref={ref} direction={'column'}>
              <Flex direction={'column'} gap={'2'} mt={'1'}>
                <Flex justify={'between'}>
                  <Heading size={'2'}>{title}</Heading>
                  <Flex gap={'2'} align={'center'} justify={'center'}>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <IconButton size={'1'} variant='ghost'>
                          <RiDeleteBinLine size={'14'} color={'gray'} />
                        </IconButton>
                      </Dialog.Trigger>
                      <Dialog.Content style={{ maxWidth: 450 }}>
                        <Dialog.Title>Xóa ghi chú</Dialog.Title>
                        <Dialog.Description size='2' mb='4'>
                          Bạn có chắc chắn muốn xóa ghi chú này không?
                        </Dialog.Description>
                        <Flex gap='3' mt='4' justify='end'>
                          <Dialog.Close>
                            <Button variant='soft' color='gray'>
                              Không
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button onClick={onDelete}>Đồng ý</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>

                    {pined == 0 ? (
                      <IconButton size={'1'} variant='ghost'>
                        <BsPinAngle size={'14'} onClick={onPinned} color={'gray'}></BsPinAngle>
                      </IconButton>
                    ) : (
                      <IconButton size={'1'} variant='ghost'>
                        <BsPinAngleFill
                          size={'14'}
                          onClick={onPinned}
                          color={'black'}
                        ></BsPinAngleFill>
                      </IconButton>
                    )}
                    <IconButton size={'1'} variant='ghost' onClick={() => setIsShowDialog(true)}>
                      <PiShareFatLight color={'gray'} />
                    </IconButton>
                  </Flex>
                </Flex>
                {/* <Dialog.Trigger> */}
                <ContentStyle
                  dangerouslySetInnerHTML={{ __html: content }}
                  onClick={() => {
                    navigate('/notes/' + idnote)
                  }}
                />
                {/* </Dialog.Trigger> */}
              </Flex>
              <Line />
              <Flex justify={'between'} mt={'4'}>
                <Flex gap={'1'}>
                  {dataUserInNote && dataUserInNote?.length > 0 ? (
                    <>
                      <Text size={'1'} color='gray'>
                        {dataUserInNote?.length}
                      </Text>
                      <GoPeople size={'13'} color='gray' />
                    </>
                  ) : (
                    <>
                      <GoPerson size={'13'} color='gray' />
                      <Text size={'1'} color='gray'>
                        Chỉ bạn
                      </Text>
                    </>
                  )}
                </Flex>
                <Flex gap={'2'} align={'center'} justify={'center'}>
                  <BsCalendar4Event size={'13'} color='gray' />
                  <Text size={'1'} color='gray'>
                    {formatDateToDDMMYYYY(formatDateTime(new Date(created)))}
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            {/* <Dialog.Content>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </Dialog.Description>
              <Inset side='x' my='5'></Inset>
              <Flex gap='3' justify='end'>
                <DialogClose>
                  <Button variant='soft' color='gray'>
                    Đóng
                  </Button>
                </DialogClose>
              </Flex>
            </Dialog.Content> */}
          </CardStyled>
        </Dialog.Root>
      </>
    )
  }
)
const CardStyled = styled(Card)(
  {
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  (props) => ({
    '&:hover': {
      backgroundColor: props.theme.colors.irisA3,
    },
  })
)

const ContentStyle = styled.button({
  display: 'block',
  height: '300px',
  maxHeight: '6em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 12,
  marginBottom: '10px',
  textAlign: 'left',
})

export default NoteItem
