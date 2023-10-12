import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  forwardRef,
  ForwardedRef,
  ChangeEvent,
  useState,
  KeyboardEvent,
} from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import ReactTextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize'

import useStore from '../store'
import styled from '@emotion/styled'
import { Box, Text } from '@radix-ui/themes'

export type NodeData = {
  label: string
}

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  // const inputRef = useRef<HTMLInputElement>(null)
  const updateNodeLabel = useStore((state) => state.updateNodeLabel)

  // useLayoutEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.style.width = `${data.label.length * 8}px`
  //   }
  // }, [data.label.length])

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (inputRef.current) {
  //       inputRef.current.focus({ preventScroll: true })
  //     }
  //   }, 1)
  // }, [])

  const onUpdateNodeLabel = (value: string) => {
    updateNodeLabel(id, value)
  }

  return (
    <>
      <Wrapper>
        <NodeInput value={data.label} onChange={onUpdateNodeLabel} />
      </Wrapper>

      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </>
  )
}

interface NodeInputProps {
  value: string
  onChange: (value: string) => void
}

const NodeInput = ({ value, onChange }: NodeInputProps) => {
  const [isEdit, setIsEdit] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const onEdit = () => {
    setIsEdit(true)
    console.log(1111)
  }

  const onBlur = () => {
    setIsEdit(false)
  }

  const onEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.key === 'Enter' && onBlur()
  }

  return (
    <InputWrapper onDoubleClick={onEdit}>
      {isEdit ? (
        <NodeInputStyled
          autoFocus
          maxRows={3}
          value={value}
          onChange={handleChange}
          onKeyDown={onEnter}
          // onBlur={onBlur}
        />
      ) : (
        <ViewOnlyText>{value}</ViewOnlyText>
      )}
    </InputWrapper>
  )
}

const Wrapper = styled.div(
  {
    padding: '3px',
    borderRadius: '6px',
  },
  (props) => ({
    backgroundColor: props.theme.colors.slate1,
  })
)

const NodeInputStyled = styled(ReactTextareaAutosize)(
  {
    // height: 'auto !important',
    border: 'none',
    resize: 'none',
    backgroundColor: 'transparent',
    display: 'block',
    padding: '4px 12px',
    width: '100%',
    fontSize: '13px',
  },
  (props) => ({
    color: props.theme.colors.slate12,
  })
)

const ViewOnlyText = styled(Text)({
  display: 'block',
  padding: '4px 12px',
  fontSize: '13px',
})

const InputWrapper = styled.div({
  width: '100px',
})

export default MindMapNode
