import { Grid } from '@radix-ui/themes'
import SideBar from '@/layout/SideBar'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

const Layout = () => {
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
