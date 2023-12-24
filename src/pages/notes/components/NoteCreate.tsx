import { Button, Container, Dialog, Flex, Heading, TextField } from '@radix-ui/themes'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useCreateNote } from '@/api/noteAPI/noteAPI.hooks'
import { ChangeEvent, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const NoteCreate = () => {
  const navigate = useNavigate()
  const onCancel = () => {
    navigate('/notes')
  }
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { mutate } = useCreateNote()

  const onChangTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onCreateNote = () => {
    mutate({
      iduser: 1,
      title: title,
      content: content,
    })
  }
  return (
    <>
      <Container size='3' pt={'9'}>
        <Heading size='2'>Tiêu đề</Heading>
        <TextField.Root my={'3'} size={'3'}>
          <TextFieldInputStyle value={title} onChange={onChangTitle} placeholder='Nhập tiêu đề' />
        </TextField.Root>
        <Heading size='2' mb={'3'}>
          Nội dung
        </Heading>
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
                    <Button onClick={onCancel}>Đồng ý</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
            <Button onClick={onCreateNote}>Lưu</Button>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}

const TextFieldInputStyle = styled(TextField.Input)({ fontSize: 13 })

export default NoteCreate
