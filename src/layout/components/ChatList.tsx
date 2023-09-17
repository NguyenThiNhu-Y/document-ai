import styled from '@emotion/styled'
import { Flex } from '@radix-ui/themes'
import EditAbleNavLink from '@/layout/components/EditAbleNavLink'
import { useCallback, useState } from 'react'
import { ChatSectionRequest } from '@/api/chatAPI/chatAPI.types'
import { useChatSections, useUpdateChatSectionName } from '@/api/chatAPI/chatAPI.hooks'

const defaulPagination = {
  iduser: 1,
  page_size: 10,
  current_page: 1,
}

export const ChatList = () => {
  const [pagination] = useState<ChatSectionRequest>(defaulPagination)
  const { data, refetch } = useChatSections(pagination)
  const { mutate } = useUpdateChatSectionName()

  const onChatTitleChange = (idchat_section: number) => (name: string) => {
    mutate({ idchat_section, name })
    refetch()
  }

  const onRemoveChat = useCallback(() => {}, [])

  console.log(data?.chat_sections)

  return (
    <FlexStyled direction={'column'} gap={'1'} ml={'4'} pl={'3'}>
      {data?.chat_sections?.map((chatSection) => (
        <EditAbleNavLink
          to={`/chat/${chatSection.idchat_section}`}
          key={chatSection.idchat_section}
          onUpdate={onChatTitleChange(chatSection.idchat_section)}
          onRemove={onRemoveChat}
        >
          {chatSection.name}
        </EditAbleNavLink>
      ))}
    </FlexStyled>
  )
}

const FlexStyled = styled(Flex)((props) => ({
  borderLeft: `1px solid ${props.theme.colors.gray5}`,
}))
