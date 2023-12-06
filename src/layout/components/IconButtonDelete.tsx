import { TrashIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes'

export const IconButtonDelete = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton size={'1'} variant='ghost'>
          <TrashIcon />
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
            <Button>Đồng ý</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
