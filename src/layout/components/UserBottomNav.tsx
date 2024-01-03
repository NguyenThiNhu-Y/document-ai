import { APP_CONTEXT } from '@/context'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { useTheme } from 'next-themes'
import { memo, useCallback, useContext } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UserBottomNav = () => {
  const context = useContext(APP_CONTEXT)
  // Retrieve the JSON string from localStorage
  const storedUserInfoString = localStorage.getItem('DOCUMENT_AI_USER_INFO')

  let username = ''
  let avatar = ''
  let email = ''
  if (context.userData) {
    username = context.userData.username
    avatar = context.userData.avatar
    email = context.userData.email
  }

  if (storedUserInfoString) {
    // Convert the JSON string to an object
    const storedUserInfo = JSON.parse(storedUserInfoString)
    username = storedUserInfo.username
    avatar = storedUserInfo.avatar
    email = storedUserInfo.email
  }
  return (
    <Flex p={'4'} gap={'2'} align={'center'}>
      <>
        {avatar ? (
          <Avatar fallback={username.charAt(0)} src={avatar} alt={username} radius='full' />
        ) : (
          <Avatar fallback={username.charAt(0)} variant={'soft'} />
        )}

        <Flex direction={'column'} mr={'auto'}>
          <Heading size={'1'}>{username}</Heading>
          <Text size={'1'}>{email}</Text>
        </Flex>
      </>

      <UserBottomNavMenu />
    </Flex>
  )
}

const UserBottomNavMenu = () => {
  const navigate = useNavigate()
  const context = useContext(APP_CONTEXT)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  const handleLogout = useCallback(() => {
    if (context.setUserData) {
      context.setUserData(null)
      localStorage.removeItem('DOCUMENT_AI_USER_INFO')
      localStorage.removeItem('DOCUMENT_AI_USER')
    }
    navigate('auth')
    toast.success('Logged out !!!', {
      style: {
        fontSize: '13px',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <DropdownMenu.Item onClick={handleLogout}>Đăng xuất</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const MemoUserBottomTab = memo(UserBottomNav)

export default MemoUserBottomTab
