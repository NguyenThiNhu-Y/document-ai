import { useParams } from 'react-router-dom'
import NewChatSectionPage from '@/pages/chatSection/components/NewChatSectionPage'
import ChatSectionViewPage from '@/pages/chatSection/components/ChatSectionViewPage'
import { DropdownMenu, Flex, IconButton } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { Section } from '@/pages/chatSection/styles/ChatSection.styles'
import { useInfoChatSection } from '@/api/chatAPI/chatAPI.hooks'
import Iframe from 'react-iframe'
import { useDocuments } from '@/api/documentAPI/documentAPI.hooks'
import styled from '@emotion/styled'

const ChatSection = () => {
  const isNewChatSectionMode = !useParams()?.chatID
  const [openDocument, setOpenDocument] = useState(false)

  const handleOpenDocument = (status: boolean) => {
    setOpenDocument(status)
  }
  const { chatID = -1 } = useParams()
  const { data } = useInfoChatSection({ idchat_section: +chatID })

  const iduser = localStorage.getItem('DOCUMENT_AI_USER')
    ? Number(localStorage.getItem('DOCUMENT_AI_USER'))
    : 0
  const { data: documents } = useDocuments({
    iduser: iduser,
    current_page: 1,
    keyword: '',
    page_size: 10,
  })

  const idDoc = data?.iddocument
  const [iddocument, setIddocument] = useState(idDoc)
  const url = 'http://localhost:8000/get_content_file/' + iddocument
  const handleClickDocument = (iddocument: number) => {
    setIddocument(iddocument)
    handleOpenDocument(true)
  }

  useEffect(() => {
    handleOpenDocument(false)
  }, [chatID])

  return isNewChatSectionMode ? (
    <NewChatSectionPage />
  ) : (
    <>
      <Flex gap={'3'}>
        {data?.iddocument == -1 && documents && documents.pages[0].documents.length > 0 && (
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger>
              <IconButton ml={'4'} mt={'4'}>
                <FaFileAlt />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {documents &&
                documents?.pages.map((page) =>
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  page.documents.map((document, i) => (
                    <DropdownMenu.Item>
                      <ButtonStyle
                        onClick={() => {
                          handleClickDocument(document.iddocument)
                        }}
                      >
                        {document.name}
                      </ButtonStyle>
                    </DropdownMenu.Item>
                  ))
                )}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {data && data.iddocument != -1 && data.document_isdeleted == 0 && (
          <IconButton
            ml={'4'}
            mt={'4'}
            onClick={() => {
              handleOpenDocument(!openDocument)
            }}
          >
            <FaFileAlt />
          </IconButton>
        )}
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

const ButtonStyle = styled.button((props) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 2,
  width: '100%',
  '&:hover': {
    backgroundColor: props.theme.colors.irisA3,
  },
}))
export default ChatSection
