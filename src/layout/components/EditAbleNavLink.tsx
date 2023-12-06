import { useUpdateChatSectionName } from '@/api/chatAPI/chatAPI.hooks'
import { EDIT_ABLE_MODE } from '@/constants/common.enum'
import NavLink from '@/layout/components/NavLink'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { CheckIcon, Cross2Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import { Ring } from '@uiball/loaders'
import {
  ComponentProps,
  forwardRef,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  memo,
} from 'react'
import { IconButtonDelete } from './IconButtonDelete'

type NavLinkProps = ComponentProps<typeof NavLink>

interface EditAbleNavLinkProps extends NavLinkProps {
  onRemove: () => void
  children: string
  chatSectionID: number
}

interface EditInputProps {
  onUpdate: () => void
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void
  defaultValue: string
}

interface EditReadOnlyViewProps {
  onEditOn: (e: MouseEvent<HTMLButtonElement>) => void
  onRemove: (e: MouseEvent<HTMLButtonElement>) => void
  text: string
  isUpdating: boolean
}

const EditAbleNavLink = ({
  onRemove,
  children: text,
  chatSectionID,
  ...props
}: EditAbleNavLinkProps) => {
  const { mutate, isLoading } = useUpdateChatSectionName()
  const [mode, setMode] = useState(EDIT_ABLE_MODE.OFF)
  const inputRef = useRef<HTMLInputElement>(null)

  const CurrentView = {
    [EDIT_ABLE_MODE.ON]: EditInput,
    [EDIT_ABLE_MODE.OFF]: EditReadOnlyView,
  }[mode]

  const onEditOn: EditReadOnlyViewProps['onEditOn'] = (e) => {
    setMode(EDIT_ABLE_MODE.ON)
    e.preventDefault()
  }

  const onEnter: EditInputProps['onEnter'] = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const newChatTitle = inputRef.current?.value

    setMode(EDIT_ABLE_MODE.OFF)
    if (newChatTitle && newChatTitle !== text) {
      mutate({ idchat_section: chatSectionID, name: newChatTitle })
    }
  }

  const isNode = (e: EventTarget | null): e is Node => {
    return !!e && 'nodeType' in e
  }

  useEffect(() => {
    const onMousedown = (e: globalThis.MouseEvent) => {
      if (isNode(e.target) && !inputRef.current?.contains(e.target)) {
        if (inputRef.current) inputRef.current.value = text
        setMode(EDIT_ABLE_MODE.OFF)
      }
    }

    window.addEventListener('mousedown', onMousedown)

    return () => {
      window.removeEventListener('mousedown', onMousedown)
    }
  }, [text])

  return (
    <Dialog.Root>
      <NavLink {...props}>
        <CurrentView
          ref={inputRef}
          defaultValue={text}
          text={inputRef.current?.value ?? text}
          isUpdating={isLoading}
          onUpdate={handleSubmit}
          onEditOn={onEditOn}
          onRemove={onRemove}
          onEnter={onEnter}
        />
      </NavLink>
    </Dialog.Root>
  )
}

const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  ({ defaultValue, onUpdate, onEnter }, ref) => {
    return (
      <>
        <TextInput
          className='edit-input'
          ref={ref}
          defaultValue={defaultValue}
          onKeyDown={onEnter}
          autoFocus
        />
        <Flex gap={'2'}>
          <IconButton variant='ghost' size={'1'} onClick={onUpdate}>
            <CheckIcon />
          </IconButton>
          <IconButton variant='ghost' size={'1'}>
            <Cross2Icon />
          </IconButton>
        </Flex>
      </>
    )
  }
)

const EditReadOnlyView = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ onEditOn, onRemove, text, isUpdating }: EditReadOnlyViewProps, _ref) => {
    const { colors } = useTheme()
    return (
      <>
        <TextStyled>{text}</TextStyled>
        <Box width={'6'} className='spacing' />
        <ViewActionButtonBox
          gap={'2'}
          ml={'auto'}
          className={isUpdating ? '' : 'chat-action-buttons'}
        >
          {isUpdating ? (
            <Ring size={14} color={colors.iris12} />
          ) : (
            <div>
              <IconButton size={'1'} variant='ghost' onClick={onEditOn}>
                <Pencil1Icon />
              </IconButton>
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
            </div>
          )}
        </ViewActionButtonBox>
      </>
    )
  }
)

const TextInput = styled.input({
  fontWeight: 500,
  fontSize: '13px',
  paddingInline: 0,
  width: '100%',
  backgroundColor: 'transparent',
  paddingBottom: '1px',
  border: 'none',

  '&:focus': {
    outline: 'none',
    border: 'none',
  },
})

const TextStyled = styled(Text)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  flex: 1,
})

const ViewActionButtonBox = styled(Flex)({
  position: 'absolute',
  right: '8px',
})

const MemoEditAbleNavLink = memo(EditAbleNavLink)

export default MemoEditAbleNavLink
