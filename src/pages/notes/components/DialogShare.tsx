import React, { ReactNode } from 'react'
import '@/components/Dialog/style.css'
import toast from 'react-hot-toast'
import { useShareNote } from '@/api/noteAPI/noteAPI.hooks'

interface Option {
  value: string
  label: string
}

type DialogType = {
  title: string
  children: ReactNode
  setIsShowDialog: (value: boolean) => void
  value: Option[] | null
  idnote: number
}
const DialogShare: React.FC<DialogType> = ({ children, setIsShowDialog, title, value, idnote }) => {
  console.log('selectedOptions', value)
  let list_iduser: number[] = []
  if (value) {
    list_iduser = value?.map((user) => {
      return +user.value
    })
  }

  const { mutate } = useShareNote()
  const onShareNote = (idnote: number) => {
    mutate(
      {
        idnote: +idnote,
        list_iduser: list_iduser,
      },
      { onSuccess: onSuccess }
    )
  }
  const onSuccess = () => {
    handleClose()
    toast.success('Chia sẻ thành công', {
      style: {
        fontSize: '13px',
      },
    })
  }

  const handleClose = () => {
    setIsShowDialog(false)
  }
  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 z-50'
      style={{ backgroundColor: '#00082F46' }}
      onClick={handleClose}
    >
      <div
        className='w-[450px] min-h-[200px] bg-white text-black absolute top-[50%] left-[50%] z-50 rounded-md wrapper'
        id='dialog'
        style={{ transform: 'translate(-50%, -50%)' }}
        onClick={handleDialogClick}
      >
        <div>
          <h1 className='heading'>Chia sẻ ghi chú</h1>
          <p className='content'>{title}</p>
        </div>
        <div className='pb-3 pr-3 text-center '>{children}</div>
        <div className='flex justify-end'>
          <div className='flex text'>
            <button onClick={handleClose} className='btn btnCancle'>
              Hủy
            </button>
            <button
              className='btn btnOk'
              onClick={() => onShareNote(idnote)}
              disabled={list_iduser.length == 0}
            >
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogShare
