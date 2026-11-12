import { Outlet } from 'react-router'
import Navbar from '../common/components/Navbar/Navbar'

const WithNavbar = () => {
  return (
    <div className='relative flex flex-col h-screen w-screen overflow-hidden'>
        <Navbar/>
        <main className='min-h-0 flex-1'>
        <Outlet/>
        </main>
    </div>
  )
}

export default WithNavbar