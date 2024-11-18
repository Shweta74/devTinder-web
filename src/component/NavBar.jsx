import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Base_url } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
const NavBar = () => {
  const user= useSelector((store) => store.user);
  const dispatch= useDispatch();
  const navigate= useNavigate()
  const handleLogout=async() =>{
    console.log("logoy")
    try{
      await axios.post(Base_url + "/logout",
        {},
        {withCredentials : true})
      dispatch(removeUser())
      return navigate("/login")
    }
    catch(err){
      console.log("logotty", err)
    }
  }
  return (
    <div><div className="navbar bg-base-300">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
    </div>
    <div className="flex-none gap-2">
      {user && (
       <div className="flex-none gap-2">
        <div className="form-control">Welcome, {user.firstName}</div>
      <div className="dropdown dropdown-end mx-5 flex">
        
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
            <Link to="/connections" className="justify-between">
              Connections
              
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div></div>)}
    </div>
  </div></div>
  )
}

export default NavBar