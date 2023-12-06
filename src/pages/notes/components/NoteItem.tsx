import styled from '@emotion/styled'
import { Button, Card, Dialog, DialogClose, Flex, Heading, Inset, Text } from '@radix-ui/themes'
import Line from '@/components/Line'
import { GoPerson } from 'react-icons/go'
import { BsCalendar4Event, BsPinAngleFill } from 'react-icons/bs'
import { BsPinAngle } from 'react-icons/bs'
import { ForwardedRef, forwardRef } from 'react'
import { Note } from '@/api/noteAPI/noteAPI.type'
import { formatDateTime } from '@/utils/datetime'
import { useDeleteNote, usePinNote } from '@/api/noteAPI/noteAPI.hooks'
import { PiShareFatLight } from 'react-icons/pi'
import { RiDeleteBinLine } from 'react-icons/ri'

interface NoteItemProps extends Note {}

const NoteItem = forwardRef(
  (
    { idnote, title, content, created, pined }: NoteItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
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

    return (
      <Dialog.Root>
        <CardStyled>
          <Flex ref={ref} direction={'column'}>
            <Flex direction={'column'} gap={'2'} mt={'1'}>
              <Flex justify={'between'}>
                <Heading size={'2'}>{title}</Heading>
                <Flex gap={'2'} align={'center'} justify={'center'}>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <RiDeleteBinLine size={'14'} />
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
                    <BsPinAngle size={'14'} onClick={onPinned}></BsPinAngle>
                  ) : (
                    <BsPinAngleFill size={'14'} onClick={onPinned}></BsPinAngleFill>
                  )}
                  <PiShareFatLight />
                </Flex>
              </Flex>
              <Dialog.Trigger>
                <ContentStyle dangerouslySetInnerHTML={{ __html: content }} />
              </Dialog.Trigger>
            </Flex>
            <Line />
            <Flex justify={'between'} mt={'4'}>
              <Flex gap={'1'}>
                <GoPerson size={'13'} color='gray' />
                <Text size={'1'} color='gray'>
                  Chỉ bạn
                </Text>
              </Flex>
              <Flex gap={'2'} align={'center'} justify={'center'}>
                <BsCalendar4Event size={'13'} color='gray' />
                <Text size={'1'} color='gray'>
                  {formatDateTime(new Date(created))}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Dialog.Content>
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
          </Dialog.Content>
        </CardStyled>
      </Dialog.Root>
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

const ContentStyle = styled.div({
  display: 'block',
  height: '300px',
  maxHeight: '6em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 12,
  marginBottom: '10px',
})

export default NoteItem
