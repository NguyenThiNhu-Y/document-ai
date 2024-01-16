import { Heading, Flex, Button, Text, TextField } from '@radix-ui/themes'
import { ChangeEvent } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

type NoteHeaderType = {
  searchKeyword?: string
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string>>
  handleSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const NotesHeader: React.FC<NoteHeaderType> = ({ searchKeyword, handleSearchChange }) => {
  const navigate = useNavigate()
  const onCreateNote = () => {
    navigate('/create-note')
  }
  return (
    <>
      <Flex pb={'5'} align={'baseline'}>
        <Heading size='3'>QUẢN LÝ GHI CHÚ</Heading>

        <Flex ml={'auto'} gap={'5'} align={'center'}>
          <TextField.Root size={'2'}>
            <TextField.Slot>
              <CiSearch size={20} />
            </TextField.Slot>
            <TextField.Input
              placeholder='Tìm ghi chú'
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </TextField.Root>
          <Button>
            <Text onClick={onCreateNote}>Tạo ghi chú</Text>
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default NotesHeader
