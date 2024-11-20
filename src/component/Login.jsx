import {useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Base_url } from '../utils/constants';

const Login = () => {
  const[emailId, setEmailId]= useState("Damodar@gmail.com");
  const[password, setPassword]= useState("Dhruv_1993");
  const[firstName, setFirstName]= useState("");
  const[lastName, setLastName]= useState("");
  const[isLoginForm, setIsLoginForm] =useState(true)
  const[error, setError] = useState("")
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const firstNameHandler=(e)=>{
    setFirstName(e.target.value)
  }
  const lastNameHandler=(e)=>{
    setLastName(e.target.value)
  }
  const emailHandler=(e)=>{
    setEmailId(e.target.value)
  }
  const passwordHandler=(e)=>{
    setPassword(e.target.value)
  }
  // const formHandler=(value)=>{
  //   setIsLoginForm(!value)
  // }
  const loginHandler=async ()=>{

   try{
    const res=await  axios.post(Base_url + "/login", {
      emailId,
      password,
    },{withCredentials:true})
    dispatch(addUser(res.data))
    return navigate("/feed")
   }
   catch(err){
    setError(err?.response?.data || "something went wrong")

   }
  }
  const signUpHandler=async()=>{
    try{
      const res=await axios.post(Base_url + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      },{withCredentials:true})
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    }catch(err){

    }
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title ">{isLoginForm ? "Login": "Signup"}</h2>
      <div>
        {!isLoginForm &&  (<>        <label className="form-control w-full max-w-xs py-2">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input type="text" value={firstName} onChange={firstNameHandler}
          className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs py-2" >
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input type="text" value={lastName}  onChange={lastNameHandler}
          className="input input-bordered w-full max-w-xs" />
        </label></>)}

        <label className="form-control w-full max-w-xs py-2">
          <div className="label">
            <span className="label-text">Email ID</span>
          </div>
          <input type="text" value={emailId} onChange={emailHandler}
          className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs py-2">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input type="text" value={password} onChange={passwordHandler}
          className="input input-bordered w-full max-w-xs" />
        </label>
      </div><p className='text-red-500'>{error}</p>
      <div className="card-actions justify-end m-2">
        <button className="btn btn-primary" onClick={isLoginForm? loginHandler : signUpHandler}>
          {isLoginForm ?"Login" : "SignUp"}</button>
      </div>
      <p onClick={() =>setIsLoginForm((value) =>!value)}>
        {isLoginForm ? 
      "New user? Signup Here" : 
      "Existing User? Login Here"}
      </p>
    </div>
  </div>
  </div>
  )
}

export default Login