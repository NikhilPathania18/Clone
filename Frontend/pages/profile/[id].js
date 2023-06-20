'use client'
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getProfileTweets } from "@/api";
import PromptCard from "@/components/PromptCard";

const TweetCardList = ({tweets, handleTagClick}) =>{
    return (
      <div className="mt-16 prompt_layout ">
        {
          tweets.length==0&&<p className="items-center font-bold text-3xl text-gray-400 w-80">No tweets from this user</p>
        }
        {
          tweets.map((tweet)=>(
            <PromptCard 
              key={tweet._id}
              tweet={tweet}
              handleTagClick={()=>{}}
            />
          ))
        }
      </div>
      )
  }

const GetProfile = () => {
    const router = useRouter();
    let {id} = router.query
    const [tweets,setTweets] = useState([]);


    const getTweets = async(id) =>{
        const res = await getProfileTweets(id);
        setTweets(res.data.tweets)
    }

    useEffect(()=>{
        if(id){
            getTweets(id);
        }
    },[id])
  return (
    <section className="feed" >
        <TweetCardList 
            tweets={tweets}
            handleTagClick={()=>{}}
        />
    </section>
  );
}

export default GetProfile;
