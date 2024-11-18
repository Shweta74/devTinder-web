import React,{useEffect} from 'react'
import { Base_url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import {addFeed} from "../utils/feedSlice"
import axios from 'axios'
import UserCard from './UserCard';
const Feed = () => {
    const feed= useSelector((store) => store.feed)
    const dispatch =useDispatch();
    const getFeed= async() => {
        if(feed) return;
        try{
            const res= await axios.get(
                Base_url + "/feed",
                {
                    withCredentials:true
                })
                dispatch(addFeed(res.data))
        }catch(err){
            console.log(err)
        }
        
    }
    useEffect(()=>{
        getFeed();
    },[])
  return (
   feed && (
    <div className='flex justify-center my-10'>
        <UserCard user={feed[0]}/>
        {/* <UserCard user={feed[1]}/>
        <UserCard user={feed[3]}/> */}
    </div>
   )
  )
}

export default Feed