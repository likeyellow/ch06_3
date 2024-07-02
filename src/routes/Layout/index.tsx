import {Outlet} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
