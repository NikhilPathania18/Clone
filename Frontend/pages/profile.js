'use client'
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getMyProfileTweets } from "@/api";
import PromptCard from "@/components/PromptCard";
import {toast } from 'react-toastify'
import { deleteTweet } from "@/api";

const TweetCardList = ({tweets, handleTagClick}) =>{

    const router = useRouter();

    const handleDelete = async(tweet) =>{
      const res = await deleteTweet(tweet)
      console.log(res)
      if(res&& res.data.success) toast.success('Tweet Deleted Succesfully')
    }
    
    const handleEdit = async(tweet) => {
      router.push(`/edit-tweet/${tweet._id}`)
    }

    return (
      <div className="mt-16 prompt_layout ">
        {
          tweets.map((tweet)=>(
            <PromptCard 
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
    },[])
  return (
    <section className="feed" >
        {
            tweets&&
            <TweetCardList 
            tweets={tweets}
            handleTagClick={()=>{}}
            />
        }
        
    </section>
  );
}

export default GetProfile;
