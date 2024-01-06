import { useParams } from 'react-router-dom'
import NewChatSectionPage from '@/pages/chatSection/components/NewChatSectionPage'
import ChatSectionViewPage from '@/pages/chatSection/components/ChatSectionViewPage'
import { Flex, IconButton } from '@radix-ui/themes'
import { useState } from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { Section } from '@/pages/chatSection/styles/ChatSection.styles'
import { useInfoChatSection } from '@/api/chatAPI/chatAPI.hooks'
import Iframe from 'react-iframe'

const ChatSection = () => {
  const isNewChatSectionMode = !useParams()?.chatID
  const [openDocument, setOpenDocument] = useState(false)
  const handleOpenDocument = () => {
    setOpenDocument(!openDocument)
  }
  const { chatID = -1 } = useParams()
  const { data } = useInfoChatSection({ idchat_section: +chatID })
  const url = 'http://localhost:8000/get_content_file/' + data?.iddocument

  return isNewChatSectionMode ? (
    <NewChatSectionPage />
  ) : (
    <>
      <Flex gap={'3'}>
        <IconButton ml={'4'} mt={'2'} onClick={handleOpenDocument}>
          <FaFileAlt />
        </IconButton>
        {openDocument && (
          <Section>
            <Iframe url={url} width='100%' height='100%' position='relative' />
          </Section>
        )}
        <Section>
          <ChatSectionViewPage />
        </Section>
      </Flex>
    </>
  )
}

export default ChatSection
