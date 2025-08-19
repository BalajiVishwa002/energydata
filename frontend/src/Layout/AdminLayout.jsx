import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import "./Layout.css"

const AdminLayout = () => {
  return (
    <div className='main'>
      <Navbar/>
      <div className="container">

      <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
