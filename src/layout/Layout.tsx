import { Grid } from '@radix-ui/themes'
import SideBar from '@/layout/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useContext, useEffect } from 'react'
import { APP_CONTEXT } from '@/context'
import toast from 'react-hot-toast'

const Layout = () => {
  const context = useContext(APP_CONTEXT)
  const navigate = useNavigate()
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem('DOCUMENT_AI_USER_INFO')

    if (storedUserInfoString) {
      // Convert the JSON string to an object
      const storedUserInfo = JSON.parse(storedUserInfoString)

      if (context.setUserData) {
        context.setUserData({
          email: storedUserInfo.email,
          username: storedUserInfo.username,
          avatar: storedUserInfo.avatar,
          iduser: storedUserInfo.iduser,
        })
      }
    }
    if (!context.userData && !storedUserInfoString) {
      navigate('auth')
      toast.error('Please login !!!')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container columns={'240px 1fr'} rows={'1'}>
      <SideBar />
      <Outlet />
    </Container>
  )
}

const Container = styled(Grid)((props) => ({
  backgroundColor: props.theme.colors.gray1,
}))

export default Layout
