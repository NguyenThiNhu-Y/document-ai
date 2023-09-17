import { Grid } from '@radix-ui/themes'
import SideBar from '@/layout/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Grid columns={{ lg: '240px 1fr' }}>
      <SideBar />
      <Outlet />
    </Grid>
  )
}

export default Layout
