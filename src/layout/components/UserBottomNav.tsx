import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { useTheme } from 'next-themes'
import { memo } from 'react'

const UserBottomNav = () => {
  return (
    <Flex p={'4'} gap={'2'} align={'center'}>
      <Avatar fallback={'Y'} variant={'soft'} />
      <Flex direction={'column'} mr={'auto'}>
        <Heading size={'1'}>Như Ý</Heading>
        <Text size={'1'}>nhuyhe@gmail.com</Text>
      </Flex>
      <UserBottomNavMenu />
    </Flex>
  )
}

const UserBottomNavMenu = () => {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant={'ghost'}>
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size={'2'}>
        <DropdownMenu.CheckboxItem onCheckedChange={toggleTheme} checked={isDarkMode}>
          Chế độ tối
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Đăng xuất</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const MemoUserBottomTab = memo(UserBottomNav)

export default MemoUserBottomTab
