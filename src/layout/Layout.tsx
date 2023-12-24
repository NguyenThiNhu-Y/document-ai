import { Grid } from '@radix-ui/themes'
import SideBar from '@/layout/SideBar'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
// import { useContext, useEffect } from 'react'
// import { APP_CONTEXT } from '@/context'
// import toast from 'react-hot-toast'

const Layout = () => {
  // const context = useContext(APP_CONTEXT)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (!context.userData) {
  //     navigate('auth')
  //     toast.error('Please login !!!')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
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
