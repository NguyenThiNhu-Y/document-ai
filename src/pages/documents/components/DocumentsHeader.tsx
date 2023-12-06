import { useUploadDocument } from '@/api/documentAPI/documentAPI.hooks'
import Line from '@/components/Line'
import { Heading, Flex, IconButton, Button, Text, TextField } from '@radix-ui/themes'
import { ChangeEvent, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiOutlineArrowUp } from 'react-icons/hi'

const DocumentsHeader = () => {
  const [file, setSelectedFile] = useState<File[]>([])
  const { mutate } = useUploadDocument()

  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    hiddenFileInput.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // When a file is selected, update the state with the selected file
    if (event.target.files) {
      const files = Array.from(event.target.files ?? [])
      setSelectedFile(files)
      const formData = new FormData()
      for (const file of files) {
        formData.append('files', file)
      }
      mutate(formData)
    }
  }

  return (
    <>
      <Flex pb={'5'} align={'baseline'}>
        <Heading size='3'>QUẢN LÝ TÀI LIỆU</Heading>
        <Flex ml={'auto'} gap={'5'} align={'center'}>
          <TextField.Root size={'2'}>
            <TextField.Slot>
              <CiSearch size={20}/>
            </TextField.Slot>
            <TextField.Input placeholder='Tìm tài liệu' />
          </TextField.Root>
          <input
            type='file'
            multiple
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Button onClick={handleClick}>
            <Text mr={'2'}>Tải lên</Text> <HiOutlineArrowUp size={16} />
          </Button>
        </Flex>
      </Flex>
      <Line />
    </>
  )
}

export default DocumentsHeader
