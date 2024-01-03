import { useCreateAnwserQuestion, useMessages } from '@/api/chatAPI/chatAPI.hooks'
import BaseChatSection from '@/pages/chatSection/components/BaseChatSection'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const ChatSectionViewPage = () => {
  const { chatID = -1 } = useParams()
  const { data, isLoading } = useMessages(+chatID)
  const iduser = localStorage.getItem('DOCUMENT_AI_USER')
    ? Number(localStorage.getItem('DOCUMENT_AI_USER'))
    : 0

  const messages = useMemo(() => {
    // console.log('render', data)
    return data?.pages.flatMap((page) => page.message) ?? []
  }, [data])

  const { mutate } = useCreateAnwserQuestion()
  const newQuestion = (message: string) => {
    mutate({
      idchat_section: Number(chatID),
      iduser: iduser,
      question: message,
    })
  }

  return <BaseChatSection onSubmit={newQuestion} isLoading={isLoading} messages={messages} />
}

export default ChatSectionViewPage
