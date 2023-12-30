import React, { ReactNode, useEffect } from 'react'
// import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

type DialogType = {
  className?: string
  setIsShowDialog: (value: boolean) => void
  children: ReactNode
}

const DialogChooseFile: React.FC<DialogType> = ({ className, children, setIsShowDialog }) => {
  // const { colors } = useTheme()
  const handleClose = () => {
    setIsShowDialog(false)
  }
  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <Overlay onClick={handleClose}>
      <DialogContainer className={className} onClick={handleDialogClick}>
        {children}
      </DialogContainer>
    </Overlay>
  )
}

// Styled components
const Overlay = styled.div(() => ({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  backgroundColor: '#00082F46',
}))

const DialogContainer = styled.div(() => ({
  width: '450px',
  minHeight: '200px',
  backgroundColor: 'white',
  // color: theme.colors.slate1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 50,
  borderRadius: '0.25rem',
  padding: '8px',
}))

export default DialogChooseFile
