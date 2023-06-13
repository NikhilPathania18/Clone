'use client'
import React from 'react';
import Form from '@/components/Form';
import router from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { createTweet } from '@/api';

const CreateTweet = () => {
  const [submitting,setSubmitting] = useState(false);
  const [post,setPost]= useState({
      content: '',
      tags:'',
  })

  const createPrompt= async(e) =>{
      e.preventDefault();
      setSubmitting(true);

      try{
          const response = await createTweet({
            content: post.content,
            tags: post.tags
          });
          if(response.status==200){
              router.push('/');
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
      type ="Create"
      post ={post}
      setPost = {setPost}
      submitting={submitting}
      handleSubmit ={createPrompt}
  />
  );
}

export default CreateTweet;
