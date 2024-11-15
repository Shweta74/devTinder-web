import {useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Base_url } from '../utils/constants';

const Login = () => {
  const[emailId, setEmailId]= useState("Damodar@gmail.com");
  const[password, setPassword]= useState("Dhruv_1993");
  const[error, setError] = useState("")
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const emailHandler=(e)=>{
    setEmailId(e.target.value)
  }
  const passwordHandler=(e)=>{
    setPassword(e.target.value)
  }
  const loginHandler=async ()=>{

   try{
    const res=await  axios.post(Base_url + "/login", {
      emailId,
      password,
    },{withCredentials:true})
    dispatch(addUser(res.data))
    return navigate("/")
   }
   catch(err){
    setError(err?.response?.data || "something went wrong")

   }
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title ">Login</h2>
      <div>
        <label className="form-control w-full max-w-xs py-2">
          <div className="label">
            <span className="label-text">Email ID</span>
          </div>
          <input type="text" value={emailId} onChange={emailHandler}
          className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs py-2" >
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input type="text" value={password}  onChange={passwordHandler}
          className="input input-bordered w-full max-w-xs" />
        </label>
      </div><p className='text-red-500'>{error}</p>
      <div className="card-actions justify-end m-2">
        <button className="btn btn-primary" onClick={loginHandler}>Login</button>
      </div>
    </div>
  </div></div>
  )
}

export default Login