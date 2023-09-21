import { Document } from '@/api/documentAPI/documentAPI.types'
import Line from '@/components/Line'
import { FILE_TYPES } from '@/constants/common.enum'
import { formatDateTime } from '@/utils/datetime'
import styled from '@emotion/styled'
import { Card, Flex, Text } from '@radix-ui/themes'
import prettyBytes from 'pretty-bytes'
import { forwardRef, ForwardedRef, useMemo } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { useTheme } from '@emotion/react'
import { FILE_ICONS } from '@/constants/common'

interface DocumentItemProps extends Document {}

const DocumentItem = forwardRef(
  ({ name, size, created }: DocumentItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const fileType = useMemo(() => name.split('.').at(-1)?.toUpperCase() as FILE_TYPES, [name])
    const { colors } = useTheme()

    const FileIcon = FILE_ICONS[fileType]

    const fileColor = {
      [FILE_TYPES.PDF]: colors.red9,
      [FILE_TYPES.DOC]: colors.blue9,
      [FILE_TYPES.DOCX]: colors.blue9,
    }[fileType]

    return (
      <Card>
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
      </Card>
    )
  }
)

export const TextDark = styled(Text)((props) => ({
  color: props.theme.colors.gray8,
}))

export const BiTimeFiveDark = styled(BiTimeFive)((props) => ({
  color: props.theme.colors.gray8,
}))

export const FileNameMask = styled(Text)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  maxWidth: '100%',
  WebkitBoxOrient: 'vertical',
})

export default DocumentItem
