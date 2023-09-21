import Line from '@/components/Line'
import { Heading, Flex, IconButton, Button, Text } from '@radix-ui/themes'
import { CiSearch, CiStar } from 'react-icons/ci'
import { HiOutlineArrowUp } from 'react-icons/hi'

const DocumentsHeader = () => {
  return (
    <>
      <Flex pb={'5'} align={'baseline'}>
        <Heading size='3'>QUẢN LÝ TÀI LIỆU</Heading>
        <Flex ml={'auto'} gap={'5'} align={'center'}>
          <IconButton variant='ghost' color='gray'>
            <CiSearch size={20} />
          </IconButton>
          <IconButton variant='ghost' color='gray'>
            <CiStar size={20} />
          </IconButton>
          <Button>
            <Text mr={'2'}>Tải lên</Text> <HiOutlineArrowUp size={16} />
          </Button>
        </Flex>
      </Flex>
      <Line />
    </>
  )
}

export default DocumentsHeader
