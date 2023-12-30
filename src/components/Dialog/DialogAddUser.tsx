import React, { ReactNode, useEffect } from 'react'
import '@/components/Dialog/style.css'
import { userAddUserToGroup } from '@/api/authAPI/auth.hooks'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

interface Option {
  value: string
  label: string
}

type DialogType = {
  title: string
  children: ReactNode
  setIsShowDialog: (value: boolean) => void
  value: Option[] | null
}
const DialogAddUser: React.FC<DialogType> = ({ children, setIsShowDialog, title, value }) => {
  const { chatID = -1 } = useParams()
  let list_iduser: number[] = []
  if (value) {
    list_iduser = value?.map((user) => {
      return +user.value
    })
  }

  const { mutate } = userAddUserToGroup()
  const idUser = localStorage.getItem('DOCUMENT_AI_USER')
  const onAddUserToGroup = () => {
    if (idUser) {
      mutate(
        {
          iduseradd: +idUser,
          idchatsection: +chatID,
          list_iduser: list_iduser,
        },
        { onSuccess: onSuccess }
      )
    }
  }
  const onSuccess = () => {
    handleClose()
    toast.success('Thêm thành công', {
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
        className='w-[450px] min-h-[200px] bg-white text-black absolute top-[50%] left-[50%] z-50 rounded-sm wrapper'
        id='dialog'
        style={{ transform: 'translate(-50%, -50%)' }}
        onClick={handleDialogClick}
      >
        <div>
          <h1 className='heading'>Thêm người dùng</h1>
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
              onClick={onAddUserToGroup}
              disabled={list_iduser.length == 0}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogAddUser
