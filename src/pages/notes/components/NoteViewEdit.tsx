import {
  Avatar,
  Button,
  Container,
  Dialog,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  TextField,
  Text,
} from '@radix-ui/themes'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useAllUserInNote,
  useDeleteUserInNote,
  useGetIsEdit,
  useGetNote,
  useGetUserInNote,
  useUpdateNote,
} from '@/api/noteAPI/noteAPI.hooks'
import { ChangeEvent, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import toast from 'react-hot-toast'
import Select, { MultiValue } from 'react-select'
import { FaUserPlus } from 'react-icons/fa'
import { BiSolidGroup } from 'react-icons/bi'
import DialogShare from '@/pages/notes/components/DialogShare'
import { RxCross2 } from 'react-icons/rx'

interface Option {
  value: string
  label: string
}

const NoteViewEdit = () => {
  const { idNote = -1 } = useParams()
  const navigate = useNavigate()
  const onCancel = () => {
    navigate('/notes')
  }
  const { data } = useGetNote({ idnote: +idNote })

  const [title, setTitle] = useState(data ? data.title : '')
  const [content, setContent] = useState(data ? data.content : '')
  const [edit, setEdit] = useState(false)
  console.log('title', title, content)

  const onChangTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onEdit = () => {
    setEdit(true)
  }

  const onView = () => {
    setEdit(false)
  }

  const { mutate } = useUpdateNote()
  const onUpdate = () => {
    mutate({
      idnote: +idNote,
      title: title,
      content: content,
    })
    console.log(title, content)
    toast.success('Chỉnh sửa thành công', {
      style: {
        fontSize: '13px',
      },
    })
    setEdit(false)
  }
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Option[] | null>(null)
  const { data: dataUser } = useAllUserInNote({ keyword: '', idnote: +idNote })
  const [keyword, setKeyword] = useState<string>('')
  const { data: dataUserInNote } = useGetUserInNote({ idnote: +idNote })

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

  const { mutate: mutateDelete } = useDeleteUserInNote()
  const onDeleteUser = (iduser: number) => {
    mutateDelete({
      idnote: +idNote,
      iduser: iduser,
    })
  }

  useEffect(() => {
    setTitle(data ? data.title : '')
    setContent(data ? data?.content : '')
  }, [data])

  const iduser = localStorage.getItem('DOCUMENT_AI_USER')
    ? Number(localStorage.getItem('DOCUMENT_AI_USER'))
    : 0
  const { data: isEdit } = useGetIsEdit({
    iduser: iduser,
    idnote: +idNote,
  })
  return (
    <>
      {isShowDialog && (
        <DialogShare
          setIsShowDialog={setIsShowDialog}
          title='Tìm người dùng muốn chia sẻ ghi chú'
          value={selectedOptions}
          idnote={+idNote}
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
      <Container size='3' pt={'4'}>
        <Flex py={'3'} align={'baseline'}>
          <Flex ml={'auto'} gap={'3'} align={'center'}>
            <DropdownMenu.Root>
              {dataUserInNote && dataUserInNote?.length > 0 && (
                <DropdownMenu.Trigger>
                  <Button style={{ backgroundColor: '#00003B0D', color: 'gray' }}>
                    <span>{dataUserInNote?.length}</span>
                    <BiSolidGroup size={20} />
                  </Button>
                </DropdownMenu.Trigger>
              )}
              <DropdownMenu.Content>
                {dataUserInNote?.map((user, index) => (
                  <>
                    <Flex m={'2'}>
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
                      {isEdit == 1 && (
                        <IconButton
                          size={'1'}
                          variant='ghost'
                          m={'2'}
                          onClick={() => onDeleteUser(user.iduser)}
                        >
                          <RxCross2 color={'gray'} />
                        </IconButton>
                      )}
                    </Flex>
                    <DropdownMenu.Separator hidden={index == dataUserInNote?.length - 1} />
                  </>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            {isEdit == 1 && (
              <Button onClick={() => setIsShowDialog(true)}>
                <FaUserPlus size={16} />
              </Button>
            )}
          </Flex>
        </Flex>
        <Heading size='2'>Tiêu đề</Heading>
        <TextField.Root my={'3'} size={'3'}>
          <TextFieldInputStyle
            value={title}
            onChange={onChangTitle}
            placeholder='Nhập tiêu đề'
            disabled={!edit ? true : false}
          />
        </TextField.Root>
        <Heading size='2' mb={'3'}>
          Nội dung
        </Heading>
        {!edit && (
          <>
            <div dangerouslySetInnerHTML={{ __html: content }} className='text-sm'></div>
            <Flex py={'3'} align={'baseline'}>
              <Flex ml={'auto'} gap={'3'} align={'center'}>
                <Button color='gray' onClick={onCancel}>
                  Quay lại
                </Button>
                {isEdit == 1 && <Button onClick={onEdit}>Chỉnh sửa</Button>}
              </Flex>
            </Flex>
          </>
        )}
        {edit && (
          <>
            <ReactQuill theme='snow' value={content} onChange={setContent} />
            <Flex py={'3'} align={'baseline'}>
              <Flex ml={'auto'} gap={'3'} align={'center'}>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button color='gray'>Hủy</Button>
                  </Dialog.Trigger>
                  <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Hủy ghi chú</Dialog.Title>
                    <Dialog.Description size='2' mb='4'>
                      Bạn có chắc chắn muốn hủy không?
                    </Dialog.Description>
                    <Flex gap='3' mt='4' justify='end'>
                      <Dialog.Close>
                        <Button variant='soft' color='gray'>
                          Không
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button onClick={onView}>Đồng ý</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
                <Button onClick={onUpdate}>Lưu</Button>
              </Flex>
            </Flex>
          </>
        )}

        {/* <Flex py={'3'} align={'baseline'}>
          <Flex ml={'auto'} gap={'3'} align={'center'}>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button color='gray'>Hủy</Button>
              </Dialog.Trigger>
              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Hủy ghi chú</Dialog.Title>
                <Dialog.Description size='2' mb='4'>
                  Bạn có chắc chắn muốn hủy không?
                </Dialog.Description>
                <Flex gap='3' mt='4' justify='end'>
                  <Dialog.Close>
                    <Button variant='soft' color='gray'>
                      Không
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button onClick={onCancel}>Đồng ý</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
            <Button onClick={onCreateNote}>Lưu</Button>
          </Flex>
        </Flex> */}
      </Container>
    </>
  )
}

const TextFieldInputStyle = styled(TextField.Input)({ fontSize: 13 })

export default NoteViewEdit
