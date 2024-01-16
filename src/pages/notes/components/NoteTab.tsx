import { Tabs } from '@radix-ui/themes'
import { NoteAllList } from '@/pages/notes/components/NoteAllList'
import { NoteSharedList } from '@/pages/notes/components/NoteSharedList'
import { NotePinnedList } from '@/pages/notes/components/NotePinnedList'
import { NoteRequest } from '@/api/noteAPI/noteAPI.type'

type NoteListType = {
  pagination: NoteRequest
}
export const NoteTab: React.FC<NoteListType> = ({ pagination }) => {
  return (
    <div>
      <Tabs.Root defaultValue='all'>
        <Tabs.List>
          <Tabs.Trigger value='all'>Tất cả</Tabs.Trigger>
          <Tabs.Trigger value='shared'>Chia sẻ với bạn</Tabs.Trigger>
          <Tabs.Trigger value='pinned'>Đã ghim</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value='all'>
          <NoteAllList pagination={pagination}></NoteAllList>
        </Tabs.Content>

        <Tabs.Content value='shared'>
          <NoteSharedList pagination={pagination}></NoteSharedList>
        </Tabs.Content>

        <Tabs.Content value='pinned'>
          <NotePinnedList pagination={pagination}></NotePinnedList>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
