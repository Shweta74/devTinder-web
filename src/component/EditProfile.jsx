import React,{useState} from 'react'
import UserCard from './UserCard';
import { Base_url } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
const EditProfile = ({user}) => {
    const[firstName, setFirstName]= useState(user.firstName);
    const[lastName, setLastName]= useState(user.lastName);
    const[photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const[age, setAge] = useState(user.age || "")
    const[gender, setGender] = useState(user.gender || "")
    const[about, setAbout] = useState(user.about || "")
    const[error, setError] = useState("")
    const[showToast, setShowToast]= useState(false);
    const dispatch =useDispatch();
    const saveProfile= async()=>{
        setError("")
        try{
            const res=await axios.patch(Base_url + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
            },{
                withCredentials :true,
            } )
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(()=>{
              setShowToast(false)
            },3000)
        }catch(err){
            setError(err.response.data)
        }
    }
    const firstnameHandler=(e)=>{
        setFirstName(e.target.value)
      }
      const lastnameHandler=(e)=>{
        setLastName(e.target.value)
      }
      const photoUrlHandler=(e)=>{
        setPhotoUrl(e.target.value)
      }
      const ageHandler=(e)=>{
        setAge(e.target.value)
      }
      const genderHandler=(e)=>{
        setGender(e.target.value)
      }
      const aboutHandler=(e)=>{
        setAbout(e.target.value)
      }
  return (
    <>
    {showToast && (<div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Profile Saved Successfully.</span>
      </div>
    </div>)}
    <div className='flex justify-center my-10'>
        <div className='flex justify-center mx-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
        <h2 className="card-title ">Edit Profile</h2>
        <div>
            <label className="form-control w-full max-w-xs py-2">
            <div className="label">
                <span className="label-text">FirstName</span>
            </div>
            <input type="text" value={firstName} onChange={firstnameHandler}
            className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs py-2" >
            <div className="label">
                <span className="label-text">Last Name</span>
            </div>
            <input type="text" value={lastName}  onChange={lastnameHandler}
            className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs py-2" >
            <div className="label">
                <span className="label-text">Photo URL:</span>
            </div>
            <input type="text" value={photoUrl}  onChange={photoUrlHandler}
            className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs py-2" >
            <div className="label">
                <span className="label-text">Age</span>
            </div>
            <input type="text" value={age}  onChange={ageHandler}
            className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs py-2" >
            <div className="label">
                <span className="label-text">Gender</span>
            </div>
            <input type="text" value={gender}  onChange={genderHandler}
            className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs py-2" >
            <div className="label">
                <span className="label-text">About</span>
            </div>
            <input type="text" value={about}  onChange={aboutHandler}
            className="input input-bordered w-full max-w-xs" />
            </label></div>
        <p className='text-red-500'>{error}</p>
        <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
        </div>
        </div>
      </div>

    </div>
    <UserCard user={{firstName, lastName, age, gender, about, photoUrl }}/>
    </div>
    </>
  )
}

export default EditProfile