import { useCreateChat, useMessages } from '@/api/chatAPI/chatAPI.hooks'
import BaseChatSection from '@/pages/chatSection/components/BaseChatSection'
import { customAlphabet } from 'nanoid'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const nanoid = customAlphabet('1234567890abcdef', 10)

const NewChatSectionPage = () => {
  const [tmpChatID, setTmpChatID] = useState(0)

  const { data } = useMessages(tmpChatID)
  const { mutate, isLoading, isSuccess, data: newChat } = useCreateChat()
  const navigate = useNavigate()

  const messages = useMemo(() => data?.pages.flatMap((page) => page.message) ?? [], [data])

  const createNewChatSection = (message: string) => {
    const tmpChatID = +nanoid()

    mutate({
      iduser: 1,
      idchat_section: tmpChatID,
      name: 'Cuộc trò chuyện mới - ' + message,
      question: message,
    })
    setTmpChatID(tmpChatID)
  }

  useEffect(() => {
    isSuccess && navigate(`/chat/${newChat.idchat_section}`)
  }, [newChat, isSuccess, navigate])

  return (
    <BaseChatSection onSubmit={createNewChatSection} isLoading={isLoading} messages={messages} />
  )
}

export default NewChatSectionPage
