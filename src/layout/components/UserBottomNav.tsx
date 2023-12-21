import { APP_CONTEXT } from '@/context'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { useTheme } from 'next-themes'
import { memo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const UserBottomNav = () => {
  const context = useContext(APP_CONTEXT)
  return (
    <Flex p={'4'} gap={'2'} align={'center'}>
      {context.userData && (
        <>
          {context.userData.avatar ? (
            <Avatar
              fallback={context.userData.username.charAt(0)}
              src={context.userData.avatar}
              alt={context.userData.username}
              className='rounded-full'
            />
          ) : (
            <Avatar fallback={context.userData.username.charAt(0)} variant={'soft'} />
          )}

          <Flex direction={'column'} mr={'auto'}>
            <Heading size={'1'}>{context.userData.username}</Heading>
            <Text size={'1'}>{context.userData.email}</Text>
          </Flex>
        </>
      )}

      <UserBottomNavMenu />
    </Flex>
  )
}

const UserBottomNavMenu = () => {
  const navigate = useNavigate()
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
        <DropdownMenu.Item onClick={() => navigate('auth')}>Đăng xuất</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const MemoUserBottomTab = memo(UserBottomNav)

export default MemoUserBottomTab
