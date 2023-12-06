import { useCreateAnwserQuestion, useMessages } from '@/api/chatAPI/chatAPI.hooks'
import BaseChatSection from '@/pages/chatSection/components/BaseChatSection'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const ChatSectionViewPage = () => {
  const { chatID = -1} = useParams()
  const { data, isLoading } = useMessages(+chatID)

  const messages = useMemo(() => data?.pages.flatMap((page) => page.message) ?? [], [data])

  const { mutate } = useCreateAnwserQuestion()
  const newQuestion = (message: string) => {
    console.log(message)
    mutate({
      idchat_section: Number(chatID),
      iduser: 1,
      question: message
    })
    console.log("sc")
  }

  return (
    <BaseChatSection
      onSubmit={newQuestion}
      isLoading={isLoading}
      messages={messages}
    />
  )
}

export default ChatSectionViewPage
