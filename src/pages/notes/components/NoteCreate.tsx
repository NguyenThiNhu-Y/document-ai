import { Card, Flex, Text } from '@radix-ui/themes'
import { BsPen } from 'react-icons/bs'


const NoteCreate = () => {
  return (
    <Card>
      <Flex gap='3' align='center' px='3' height={'6'}>
        <BsPen />
        <Text as='div' size='2'>
          Tạo ghi chú
        </Text>
      </Flex>
    </Card>
  )
}

export default NoteCreate
