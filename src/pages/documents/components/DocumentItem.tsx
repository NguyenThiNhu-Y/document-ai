import { Document } from '@/api/documentAPI/documentAPI.types'
import Line from '@/components/Line'
import { FILE_TYPES } from '@/constants/common.enum'
import { formatDateTime } from '@/utils/datetime'
import styled from '@emotion/styled'
import { Button, Card, Dialog, DropdownMenu, Flex, IconButton, Text } from '@radix-ui/themes'
import prettyBytes from 'pretty-bytes'
import { forwardRef, ForwardedRef, useMemo } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { useTheme } from '@emotion/react'
import { FILE_ICONS } from '@/constants/common'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDeleteDocument } from '@/api/documentAPI/documentAPI.hooks'

interface DocumentItemProps extends Document {}

const DocumentItem = forwardRef(
  ({ iddocument, name, size, created }: DocumentItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const fileType = useMemo(() => name.split('.').at(-1)?.toUpperCase() as FILE_TYPES, [name])
    const { colors } = useTheme()

    const navigate = useNavigate()

    const onViewMindMap = () => {
      navigate('/mindmaps/' + iddocument)
    }

    const onViewSummary = () => {
      navigate('/summary/' + iddocument)
    }

    const { mutate: mutateDelete } = useDeleteDocument()
    const onDelete = () => {
      mutateDelete({
        iddocument: iddocument,
      })
    }

    const FileIcon = FILE_ICONS[fileType]

    const fileColor = {
      [FILE_TYPES.PDF]: colors.red9,
      [FILE_TYPES.DOC]: colors.blue9,
      [FILE_TYPES.DOCX]: colors.blue9,
    }[fileType]

    return (
      <CardStyled>
        <Flex ref={ref} direction={'column'}>
          <Flex direction={'column'} justify={'center'} align={'center'} gap={'4'} mt={'4'}>
            <FileIcon size={72} color={fileColor} />
            <FileNameMask mb={'4'}>{name}</FileNameMask>
          </Flex>
          <Line />
          <Flex justify={'between'} mt={'4'}>
            <Flex direction={'column'} gap={'1'}>
              <Text size={'1'}>Kích thước:</Text>
              <TextDark size={'1'}>{prettyBytes(+size)}</TextDark>
            </Flex>
            <Flex gap={'2'} align={'center'} justify={'center'}>
              <Text size={'1'} color='gray'>
                {formatDateTime(new Date(created))}
              </Text>
              <BiTimeFiveDark size={20} />
            </Flex>
          </Flex>
        </Flex>
        <Dialog.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <MenuButton color='gray' variant={'ghost'}>
                <DotsVerticalIcon />
              </MenuButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size={'2'}>
              <DropdownMenu.Item onClick={onViewSummary}>Tóm tắt nội dung</DropdownMenu.Item>
              <DropdownMenu.Item onClick={onViewMindMap}>Sơ đồ tư duy</DropdownMenu.Item>
              <DropdownMenu.Item>
                <Dialog.Trigger>
                  <Text>Xóa tài liệu</Text>
                </Dialog.Trigger>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Xóa tài liệu</Dialog.Title>
            <Dialog.Description size='2' mb='4'>
              Bạn có chắc chắn muốn xóa tài liệu này không?
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
      </CardStyled>
    )
  }
)

const CardStyled = styled(Card)(
  {
    position: 'relative',
  },
  (props) => ({
    '&:hover': {
      backgroundColor: props.theme.colors.irisA3,
    },
  })
)

const MenuButton = styled(IconButton)({
  position: 'absolute',
  top: '12px',
  right: '12px',
})

const TextDark = styled(Text)((props) => ({
  color: props.theme.colors.gray8,
}))

const BiTimeFiveDark = styled(BiTimeFive)((props) => ({
  color: props.theme.colors.gray8,
}))

const FileNameMask = styled(Text)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  maxWidth: '100%',
  WebkitBoxOrient: 'vertical',
})

export default DocumentItem
