import { Tabs } from '@radix-ui/themes'
import { NoteAllList } from './NoteAllList'
import { NoteSharedList } from './NoteSharedList'
import { NotePinnedList } from './NotePinnedList'

export const NoteTab = () => {
  return (
    <div>
      <Tabs.Root defaultValue='all'>
        <Tabs.List>
          <Tabs.Trigger value='all'>Tất cả</Tabs.Trigger>
          <Tabs.Trigger value='shared'>Chia sẻ với bạn</Tabs.Trigger>
          <Tabs.Trigger value='pinned'>Đã ghim</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value='all'>
          <NoteAllList></NoteAllList>
        </Tabs.Content>

        <Tabs.Content value='shared'>
          <NoteSharedList></NoteSharedList>
        </Tabs.Content>

        <Tabs.Content value='pinned'>
          <NotePinnedList></NotePinnedList>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

