'use client'
import React, { useEffect } from 'react';
import Form from '@/components/Form';
import router from 'next/router';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { edit_Tweet , getTweetDetails} from '@/api';
import { toast } from 'react-toastify';

const EditTweet = () => {
  const [submitting,setSubmitting] = useState(false);
  const [tweet,setTweet]= useState({
      content: '',
      tags:'',
  })
  const searchParams = useSearchParams();
  const tweetId = searchParams.get('id')


  useEffect(()=>{
    const getDetails = async() => {
        if(tweetId){
            const res =  await getTweetDetails(tweetId)
            setTweet(res.data);
        }
    }
    getDetails();
  },[tweetId])

  const editTweet= async(e) =>{
      e.preventDefault();
      setSubmitting(true);

      try{
          const response = await edit_Tweet({
            _id: tweetId,
            content: tweet.content,
            tags: tweet.tags
          });
          if(response.status==200){
              toast.success('Tweed Edited succesfully');
              router.push('/profile');
          }
      }
      catch(err){
          console.log(err);
      }
      finally{
          setSubmitting(false);
      }
  }
return (
<Form 
      type ="Edit"
      post ={tweet}
      setPost = {setTweet}
      submitting={submitting}
      handleSubmit ={editTweet}
  />
  );
}

export default EditTweet;
