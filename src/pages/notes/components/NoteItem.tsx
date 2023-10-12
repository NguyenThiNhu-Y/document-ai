import styled from '@emotion/styled'
import { Card, DropdownMenu, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import Line from '@/components/Line'
import { GoPerson } from 'react-icons/go'
import { BsCalendar4Event } from 'react-icons/bs'

export const NoteItem = () => {
  return (
    <CardStyled>
      <Flex direction={'column'}>
        <Flex direction={'column'} gap={'4'} mt={'4'}>
          <Heading>aa</Heading>
          <Text>aa</Text>
        </Flex>
        <Line />
        <Flex justify={'between'} mt={'4'}>
          <Flex gap={'1'}>
            <GoPerson />
            <Text size={'1'} color='gray'>
              Chỉ bạn
            </Text>
          </Flex>
          <Flex gap={'2'} align={'center'} justify={'center'}>
            <BsCalendar4Event />
            <Text size={'1'} color='gray'>
              ngày
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </CardStyled>
  )
}

const CardStyled = styled(Card)({
  position: 'relative',
})


// export const NoteItem = (prop: NoteItemRespon) => {
//   return (
//     <Wrapper>
//       <Heading mb='2' size='4'>
//         {prop.title}
//       </Heading>
//       <Text>{prop.content}</Text>
//     </Wrapper>
//   )
// }

const Wrapper = styled.div({
  borderRadius: '4px',
  background: 'black',
})
