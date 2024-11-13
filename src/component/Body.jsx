import React from 'react'
import NavBar from "./NavBar"
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Body = () => {
  return (
    <div>
        <NavBar/>
        <p>hello world</p>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body