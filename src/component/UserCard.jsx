import React from 'react'
import { Base_url } from '../utils/constants';
import { removeUserFromFeed} from '../utils/feedSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const UserCard = ({ user }) => {
  
    const {_id, firstName, lastName, photoUrl, age, gender, about} = user;
    const dispatch= useDispatch();
    const handleSendRequest= async(status, userId)=>{
      try{
        const res=await axios.post(
          Base_url+ "/request/send/" + status + "/" + userId, 
          {},
          {withCredentials: true}
         )
         dispatch(removeUserFromFeed(userId))
      }catch(err){
        console.log(err)
      }
    }
  
    return (
    <div><div className="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      <p>{about}</p>
      {age && gender && <p>{age+ " " + gender}</p>}
      <div className="card-actions justify-center my-4">
        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
        <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
      </div>
    </div>
  </div></div>
  )
}

export default UserCard