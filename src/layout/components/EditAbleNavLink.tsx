import { EDIT_ABLE_MODE } from '@/constants/common.enum'
import NavLink from '@/layout/components/NavLink'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { CheckIcon, Cross2Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Ring } from '@uiball/loaders'
import {
  ComponentProps,
  forwardRef,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
} from 'react'

type NavLinkProps = ComponentProps<typeof NavLink>

interface EditAbleNavLinkProps extends NavLinkProps {
  onUpdate: (name: string) => void
  onRemove: () => void
  children: string
  isUpdating: boolean
}

interface EditInputProps {
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
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
  onUpdate,
  onRemove,
  children: text,
  isUpdating,
  ...props
}: EditAbleNavLinkProps) => {
  const [mode, setMode] = useState(EDIT_ABLE_MODE.OFF)
  const inputRef = useRef<HTMLInputElement>(null)

  const CurrentView = {
    [EDIT_ABLE_MODE.ON]: EditInput,
    [EDIT_ABLE_MODE.OFF]: EditReadOnlyView,
  }[mode]

  const onBlur: EditInputProps['onBlur'] = (e) => {
    if (inputRef.current) inputRef.current.value = text
    setMode(EDIT_ABLE_MODE.OFF)
    e.preventDefault()
  }

  const onEditOn: EditReadOnlyViewProps['onEditOn'] = (e) => {
    setMode(EDIT_ABLE_MODE.ON)
    e.preventDefault()
  }

  const onEnter: EditInputProps['onEnter'] = (e) => {
    if (e.key === 'Enter') {
      setMode(EDIT_ABLE_MODE.OFF)
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    inputRef.current && onUpdate(inputRef.current.value)
  }

  return (
    <NavLink {...props}>
      <CurrentView
        ref={inputRef}
        defaultValue={text}
        text={inputRef.current?.value ?? text}
        isUpdating={isUpdating}
        onBlur={onBlur}
        onUpdate={handleSubmit}
        onEditOn={onEditOn}
        onRemove={onRemove}
        onEnter={onEnter}
      />
    </NavLink>
  )
}

const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  ({ onBlur, defaultValue, onUpdate, onEnter }, ref) => {
    return (
      <>
        <TextInput
          ref={ref}
          defaultValue={defaultValue}
          onBlur={onBlur}
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
        {text}
        <Flex ml={'auto'} gap={'2'} className={isUpdating ? '' : 'chat-action-buttons'}>
          {isUpdating ? (
            <Ring size={14} color={colors.iris12} />
          ) : (
            <>
              <IconButton size={'1'} variant='ghost' onClick={onEditOn}>
                <Pencil1Icon />
              </IconButton>
              <IconButton size={'1'} variant='ghost' onClick={onRemove}>
                <TrashIcon />
              </IconButton>
            </>
          )}
        </Flex>
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

  '&:focus': {
    outline: 'none',
    border: 'none',
  },
})

export default EditAbleNavLink
