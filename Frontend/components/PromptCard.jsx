'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const PromptCard = ({tweet, handleDelete, handleEdit}) => {

  const [content, setContent] = useState(tweet.content);
  const [tags, setTags] = useState(tweet?.tags)
  const [editOn,setEditOn] = useState(false)

  let link = `http://localhost:3000/profile/${tweet.creator._id}`
  const pathName= usePathname();

  const [signedIn,setSignedIn] = useState(false)

  useEffect(()=>{
    const data = localStorage.getItem('userData')
    if(data)  setSignedIn(true)
  },[])

  const router = useRouter();

  // const handleEdit = async(id) => {

  // }

  // const handleDelete = async(id) => {

  // }


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

      <p className="my-4 font-satoshi text-sm text-gray-700">{tweet.content}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={()=>handleTagClick &&handleTagClick(post.tag)}  
      >
        #{tweet?.tags}
      </p>

      {signedIn && pathName ==='/profile' && (
        <div className="mt-4 flex flex-end gap-5 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p className="font-inter text-sm orange_gradient cursor-pointer" 
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>

      )}
    </div>
  );
}

export default PromptCard;
