import { useCreateChat, useMessages } from '@/api/chatAPI/chatAPI.hooks'
import BaseChatSection from '@/pages/chatSection/components/BaseChatSection'
import { customAlphabet } from 'nanoid'
import { useEffect, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const nanoid = customAlphabet('1234567890', 10)

const NewChatSectionPage = () => {
  const { iddocument = -1 } = useParams()
  const iduser = localStorage.getItem('DOCUMENT_AI_USER')
    ? Number(localStorage.getItem('DOCUMENT_AI_USER'))
    : 0

  const tmpChatID = useRef(+nanoid()).current

  const { data } = useMessages(tmpChatID)
  const { mutate, isLoading, isSuccess, data: newChat } = useCreateChat()
  const navigate = useNavigate()

  const messages = useMemo(() => data?.pages.flatMap((page) => page.message) ?? [], [data])

  const createNewChatSection = (message: string) => {
    mutate({
      iduser: iduser,
      idchat_section: tmpChatID,
      name: 'Cuộc trò chuyện mới - ' + message,
      question: message,
      iddocument: +iddocument,
    })
  }

  useEffect(() => {
    isSuccess && navigate(`/chat/${newChat.idchat_section}`)
  }, [newChat, isSuccess, navigate])

  return (
    <BaseChatSection onSubmit={createNewChatSection} isLoading={isLoading} messages={messages} />
  )
}

export default NewChatSectionPage
