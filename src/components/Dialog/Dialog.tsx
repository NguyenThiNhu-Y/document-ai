import React, { ReactNode } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { MdOutlineDelete } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import '@/components/Dialog/style.css'

type DialogType = {
  title: string
  children: ReactNode
  setIsShowDialog: (value: boolean) => void
}
const Dialog: React.FC<DialogType> = ({ children, setIsShowDialog, title }) => {
  const handleClose = () => {
    setTimeout(() => {
      setIsShowDialog(false)
    }, 200)
  }
  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 z-50'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={handleClose}
    >
      <div
        className='w-[600px] min-h-[200px] bg-white text-black absolute top-[50%] left-[50%] z-50 rounded-md '
        id='dialog'
        style={{ transform: 'translate(-50%, -50%)' }}
        onClick={handleDialogClick}
      >
        <div className='flex justify-between border-b p-2'>
          <h1>{title}</h1>
          <button
            className='p-2 font-semibold rounded-md border hover:bg-slate-300 '
            onClick={handleClose}
          >
            <LiaTimesSolid />
          </button>
        </div>
        <div className='px-8 py-4 text-center'>{children}</div>
        <div className='flex justify-end'>
          <div className='flex font-semibold p-2 text-white'>
            <button
              className='flex items-center border text-black px-2 py-1 rounded-md hover:bg-slate-300'
              onClick={handleClose}
            >
              <TiCancel /> <span className='ml-1'>Cancel</span>
            </button>
            <button className='flex items-center bg-red-400 px-2 py-1 ml-2 rounded-md hover:bg-red-600'>
              <MdOutlineDelete /> <span>Thêm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
