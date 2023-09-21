import styled from '@emotion/styled'
import { Box, Flex } from '@radix-ui/themes'
import EditAbleNavLink from '@/layout/components/EditAbleNavLink'
import { useCallback, useEffect } from 'react'
import { useChatSections, useUpdateChatSectionName } from '@/api/chatAPI/chatAPI.hooks'
import { useInView } from 'react-intersection-observer'

export const ChatList = () => {
  const { data, hasNextPage, fetchNextPage } = useChatSections()
  const { mutate, isLoading } = useUpdateChatSectionName()
  const { ref, inView } = useInView()

  const onChatTitleChange = (idchat_section: number) => (name: string) => {
    mutate({ idchat_section, name })
  }

  const onRemoveChat = useCallback(() => {}, [])

  useEffect(() => {
    inView && hasNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <FlexStyled direction={'column'} gap={'1'} ml={'4'} pl={'3'}>
      {data?.pages.map((page) =>
        page.chat_sections.map((chatSection, i) => (
          <Box
            ref={page.chat_sections.length === i + 1 ? ref : undefined}
            key={chatSection.idchat_section}
          >
            <EditAbleNavLink
              to={`/chat/${chatSection.idchat_section}`}
              onUpdate={onChatTitleChange(chatSection.idchat_section)}
              onRemove={onRemoveChat}
              className='chat-section'
              isUpdating={isLoading}
            >
              {chatSection.name}
            </EditAbleNavLink>
          </Box>
        ))
      )}
    </FlexStyled>
  )
}

const FlexStyled = styled(Flex)((props) => ({
  borderLeft: `1px solid ${props.theme.colors.gray5}`,
}))
