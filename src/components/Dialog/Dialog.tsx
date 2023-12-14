import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { MdOutlineDelete } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import '@/components/Dialog/style.css'

type DialogType = {
  message: string
  setIsShowDialog: (value: boolean) => void
}
const Dialog: React.FC<DialogType> = ({ message, setIsShowDialog }) => {
  const handleClose = () => {
    console.log('dialog closed')
    setTimeout(() => {
      setIsShowDialog(false)
    }, 200)
  }
  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={handleClose}
    >
      <div
        className='w-[400px] bg-white text-black absolute top-[50%] left-[50%] z-50 rounded-md overflow-hidden'
        id='dialog'
        style={{ transform: 'translate(-50%, -50%)' }}
        onClick={handleDialogClick}
      >
        <div className='flex justify-end border-b p-2'>
          <button
            className='p-2 font-semibold rounded-md border hover:bg-slate-300 '
            onClick={handleClose}
          >
            <LiaTimesSolid />
          </button>
        </div>
        <div className='px-8 py-4 text-center'>
          <h4 className='font-semibold text-xl'>{message}</h4>
        </div>
        <div className='flex justify-end'>
          <div className='flex font-semibold p-2 text-white'>
            <button
              className='flex items-center border text-black px-2 py-1 rounded-md hover:bg-slate-300'
              onClick={handleClose}
            >
              <TiCancel /> <span className='ml-1'>Cancel</span>
            </button>
            <button className='flex items-center bg-red-400 px-2 py-1 ml-2 rounded-md hover:bg-red-600'>
              <MdOutlineDelete /> <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
