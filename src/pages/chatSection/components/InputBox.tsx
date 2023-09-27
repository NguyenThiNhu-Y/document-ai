import { IconButton } from '@radix-ui/themes'
import styled from '@emotion/styled'
import { PiPaperPlaneTiltFill } from 'react-icons/pi'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

interface InputBoxProps {
  onSubmit: (message: string) => void
  isLoading: boolean
}

const InputBox = ({ onSubmit, isLoading }: InputBoxProps) => {
  const [messageValue, setMessageValue] = useState('')
  const disabled = !messageValue.length || isLoading

  const onMessageValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageValue(e.target.value)
  }

  const onEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled || e.key !== 'Enter') return

    onSubmit(messageValue)
    setMessageValue('')
  }

  return (
    <>
      <ResizeInput
        maxRows={5}
        className='input'
        placeholder='Hỏi gì đó....'
        onChange={onMessageValueChange}
        onKeyDown={onEnter}
        value={messageValue}
      />
      <IconButtonStyled radius='full' size={'3'} disabled={disabled}>
        <PiPaperPlaneTiltFill />
      </IconButtonStyled>
    </>
  )
}

const ResizeInput = styled(ReactTextareaAutosize)(
  {
    width: '100%',
    border: 'none',
    resize: 'none',
    outline: 'none',
    paddingRight: '4px',
    backgroundColor: 'transparent',
  },
  (props) => ({
    color: props.theme.colors.slate12,

    '&::-webkit-scrollbar': {
      width: '4px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: props.theme.colors.grayA3,
      borderRadius: 999,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: props.theme.colors.grayA8,
      borderRadius: 999,
    },
  })
)

const IconButtonStyled = styled(IconButton)({
  transition: 'background-color 0.1s',
})

export default InputBox
