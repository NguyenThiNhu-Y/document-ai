import React, { ReactNode, useEffect } from 'react'

type DialogType = {
  className?: string
  setIsShowDialog: (value: boolean) => void
  children: ReactNode
}
const DialogChooseFile: React.FC<DialogType> = ({ className, children, setIsShowDialog }) => {
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
    <div
      className='fixed top-0 bottom-0 left-0 right-0 z-50'
      style={{ backgroundColor: '#00082F46' }}
      onClick={handleClose}
    >
      <div
        className={`${className} w-[450px] min-h-[200px] bg-white text-black absolute top-[50%] left-[50%] z-50 rounded-sm px-4 py-2`}
        id='dialog'
        onClick={handleDialogClick}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {children}
      </div>
    </div>
  )
}

export default DialogChooseFile
