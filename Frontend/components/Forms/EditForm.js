import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import { edit_Tweet } from '@/api';
import {toast} from 'react-toastify'
const EditForm = ({tweet, handleDelete,handleEdit}) => {
    let link = `http://localhost:3000/profile/${tweet.creator._id}`
    console.log(tweet._id);
    
    const [content, setContent] = useState(tweet.content);
    const [tags, setTags] = useState(tweet?.tags)
    const [editOn,setEditOn] = useState(false)
    const pathName= usePathname();

    const handleThisEdit = async() => {
        setEditOn(true)
    }

    const submitTweet = async() => {
        setEditOn(false)
        try{
            const response = await edit_Tweet({
              _id: tweet._id,
              content: content,
              tags: tags
            });
            if(response.status==200){
                toast.success('Tweed Edited succesfully');
                router.push('/');
            }
        }
        catch(err){
            console.log(err);
        }
    }

  const [signedIn,setSignedIn] = useState(false)

  useEffect(()=>{
    const data = localStorage.getItem('userData')
    if(data)  setSignedIn(true)
  },[])

  const router = useRouter();
  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <Link href={link}>
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
            src={tweet?.creator?.profilePhoto}
            alt="user_image"
            width={43}
            height={43}
            className="rounded-full object-cover w-10 h-10"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{tweet.creator?.username}</h3>
            <p className="font-inter text-sm text-gray-500">{tweet.creator?.name}</p>
          </div>
        </div>
        </Link>
      </div>  
      {
        editOn?(
            <form onSubmit={()=>{}}>
            <input type='textarea' name = 'content' value={content} onChange={(e) => {  setContent(e.target.value)}} className="form_textarea glassmorphism" />
            <input type = 'text' name = 'tags' value = {tags} onChange={(e) => {setTags(e.target.value)}} className='font-inter text-sm form_input blue_gradient glassmorphism ' />
        </form>

        ):(
            <>
            <p className="my-4 font-satoshi text-sm text-gray-700">{tweet.content}</p>
            <p className="font-inter text-sm blue_gradient cursor-pointer" >
                #{tweet?.tags}
            </p>
            </>
        )
      }
      {(signedIn && pathName ==='/profile' && editOn=== false) ? (
        <div className="mt-4 flex flex-end gap-5 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleThisEdit}
          >
            Edit
          </p>

          <p className="font-inter text-sm orange_gradient cursor-pointer" 
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      ):(
        <div className="mt-4 flex flex-end gap-5 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={submitTweet}
          >
            Edit Tweet
          </p>

          
        </div>
      )}
    </div>
  );
}

export default EditForm;
