'use client'

import { useState,useEffect } from "react";
import PromptCard from "./PromptCard";
import axios from "axios";

const TweetCardList = ({tweets, handleTagClick}) =>{
  return (
    <div className="m-16 prompt_layout ">
      {
        tweets.map((tweet)=>(
          <PromptCard 
            key={tweet._id}
            tweet={tweet}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
    )
}


const Feed = () => {

  const [searchText,setSearchText]= useState('');
  const [posts,setPosts]=useState([]);

  const handleSearchChange = (e) =>{
    setSearchText(e.target.value)
  }

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await axios.get('http://localhost:8000/api/fetch-tweets');

      setPosts(response.data.tweets)
    }
    fetchPosts();
  },[])
  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange = {handleSearchChange}
          required
          className="search_input peer mx-3"
        ></input>
      </form>
      <TweetCardList
      tweets={posts}
      handleTagClick={()=>{}}
      />
    </section>
  );
}

export default Feed;
