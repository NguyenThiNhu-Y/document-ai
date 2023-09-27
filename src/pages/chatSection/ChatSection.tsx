import { useParams } from 'react-router-dom'
import NewChatSectionPage from '@/pages/chatSection/components/NewChatSectionPage'
import ChatSectionViewPage from '@/pages/chatSection/components/ChatSectionViewPage'

const ChatSection = () => {
  const isNewChatSectionMode = !useParams()?.chatID

  return isNewChatSectionMode ? <NewChatSectionPage /> : <ChatSectionViewPage />
}

export default ChatSection
