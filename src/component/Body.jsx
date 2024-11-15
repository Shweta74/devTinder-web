import React, {useEffect}from 'react'
import NavBar from "./NavBar";
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { Base_url } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const fetchUser=async()=>{
    try{
      const res= await axios.get(Base_url + "/profile/view",{
        withCredentials : true,
      })
      dispatch(addUser(res.data))
    }catch(err){
      if(err.status === 401){
        navigate("/login")
      }

      console.error(err);
    }
  }
  useEffect(()=>{
    fetchUser();
  }, [])
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body