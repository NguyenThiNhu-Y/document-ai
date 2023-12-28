import React, { useEffect } from 'react'
import '@/components/Dialog/style.css'
import { useDeleteChatSection } from '@/api/chatAPI/chatAPI.hooks'
import { useNavigate, useParams } from 'react-router-dom'

type DialogType = {
  message: string
  setIsShowDialog: (value: boolean) => void
}
const Dialog: React.FC<DialogType> = ({ message, setIsShowDialog }) => {
  const handleClose = () => {
    console.log('dialog closed')
    setIsShowDialog(false)
  }
  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const navigate = useNavigate()

  const onSuccess = () => {
    handleClose()
    navigate('/new-chat/-1')
  }

  const { chatID = -1 } = useParams()
  const { mutate } = useDeleteChatSection()
  const onDelete = () => {
    mutate(
      {
        idchat_section: +chatID,
      },
      { onSuccess: onSuccess }
    )
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0'
      style={{ backgroundColor: '#00082F46' }}
      onClick={handleClose}
    >
      <div
        className='w-[450px] bg-white text-black absolute top-[50%] left-[50%] z-50 rounded-sm overflow-hidden wrapper'
        id='dialog'
        style={{ transform: 'translate(-50%, -50%)' }}
        onClick={handleDialogClick}
      >
        <div>
          <h1 className='heading'>Xóa đoạn chat</h1>
          <p className='content'>{message}</p>
        </div>
        <div className='flex justify-end'>
          <div className='flex text'>
            <button onClick={handleClose} className='btn btnCancle'>
              Không
            </button>
            <button className='btn btnOk' onClick={onDelete}>
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
