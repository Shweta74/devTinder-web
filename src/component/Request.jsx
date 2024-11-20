import React, { useEffect } from 'react'
import { Base_url } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
const Request = () =>{
    const dispatch= useDispatch()
    const request =useSelector((store) => store.request)
    
    const reviewRequest = async(status, _id)=>{
        try{
            const res= axios.post(
                Base_url+ "/request/review/" + status + "/" + _id,
                {},
                {withCredentials :true}
            )
            dispatch(removeRequest(_id))
        }catch(err){
            console.log(err)
        }
    }
    
    
    const fetchRequest = async()=>{
        try{
            const res=await axios.get(Base_url + "/user/requests/recieved", {
                withCredentials:true,
            })
            console.log(res)
            dispatch(addRequests(res.data.data))
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchRequest()
    },[])
    if(!request) return;

    // if(request.length=== 0){
    //     return <h1>No request Found</h1>
    // }
  return (
    <div className='text-center my-10'>
        <h1 className='text-bold text-3xl text-black'>Connection Requests</h1>
        {request.map((request)=>{
            const {_id, firstName, lastName, photoUrl, age, gender, about, skills
            }= request.fromUserId;
          return  (
                <div key={_id} className=' flex justify-between items-center m-4 p-4 border rounded-lg bg-base-300 w-2/5 mx-auto'>
                    <div><img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/></div>
                    <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + "," + gender}</p>}

                     <p>{about}</p>
                     
                    </div>
                    <div><button className="btn btn-primary mx-1" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
                     <button className="btn btn-secondary mx-1" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button></div>
                </div>
        )
        })}
    </div>
  )
}

export default Request