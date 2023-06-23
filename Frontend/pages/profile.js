'use client'
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getMyProfileTweets } from "@/api";
import {toast } from 'react-toastify'
import { deleteTweet } from "@/api";
import EditForm from "@/components/Forms/EditForm";

const TweetCardList = ({tweets, deleted,setDeleted}) =>{
  

    const router = useRouter();

    const handleDelete = async(tweet) =>{
      const res = await deleteTweet(tweet)
      if(res&& res.data.success) toast.success('Tweet Deleted Succesfully')
      setDeleted(true);
    }
    
    const handleEdit = async(tweet) => {
      router.push(`/edit-tweet/${tweet._id}`)
    }

    return (
      <div className="mt-16 prompt_layout ">
        {
          tweets.length==0&&<p className="items-center font-bold text-3xl text-gray-400 w-80">No tweets from this user</p>
        }
        {
          tweets.map((tweet)=>(
            <EditForm 
              key={tweet._id}
              tweet={tweet}
              handleTagClick={()=>{}}
              handleEdit={()=>{handleEdit(tweet)}}
              handleDelete={()=>{handleDelete(tweet)}}
            />
          ))
        }
      </div>
      )
  }

const GetProfile = () => {
    const router = useRouter();
    const [tweets,setTweets] = useState([]);
    const [edited,setEdited] = useState(false);
    const [deleted, setDeleted] = useState(false);


    const getTweets = async() =>{
        const res = await getMyProfileTweets();
        if(res&&res.data.message=='Invalid Token'){
            toast.error('You Need to Log In')
            router.push('/login')
            return;
        }
        setTweets(res.data.tweets)
    }

    useEffect(()=>{
            getTweets();
            setDeleted(false)
    },[deleted])

    useEffect(()=>{
      
    })
  return (
    <section className="feed" >
        {
            tweets&&
            <TweetCardList 
            tweets={tweets}
            handleTagClick={()=>{}}
            deleted= {deleted}
            setDeleted= {setDeleted}
            />
        }
        
    </section>
  );
}

export default GetProfile;
