'use client'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Input from '../Atoms/inputName'
import Submit from '../Atoms/Submit'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'


function SignUpForm() {

    const router = useRouter();

    const [form,setForm] = useState({username:'',name:'',email:'',password:'',confirmPassword:'',image: null})

    const [sub,setSub] = useState('Submit')

    const handleChange=(e)=>{
    const {name, value}= e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }))

    // setForm({...form,[e.target.name]:e.target.value})
  }

  const handleFileUpload = (e) =>{
    const file = e.target.files[0];
    setForm((prevState) => ({
      ...prevState,
      image: file,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();


    // if(form.password!==form.confirmPassword){
    //   toast.error("Passwords don't Match");
    //   return;
    // }

    const userData = new FormData();
    userData.append("username", form.username);
    userData.append("name",form.name);
    userData.append("email",form.email);
    userData.append("password",form.password);
    userData.append("image",form.image)


    try {
      setSub("Loading...")
      const res = await axios.post("http://localhost:8000/api/signup", userData); 
      setSub("Submit")
      console.log('response',res)
      if (res && res.data.success) {
        toast.success(res.data.message);
        router.push('/login')
      } else {
        setSub('Submit')
        toast.error(res.data.message);
      }
    }
    catch (error) {
      console.log('error',error);
      toast.error(error.response.data.message);
      setSub('Submit')
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
  <div id="form" className="m-5 block bg-slate-50 p-6 rounded-xl shadow-md shadow-slate-300 w-80">
    <form onSubmit={handleSubmit}>
      <h2 className="text-blue-700 text-3xl font-semibold my-4">Register</h2>


      <label htmlFor="username" className="text-sm">Username</label>
      <Input  type={'text'} name='username' value={form.username} handleChange={handleChange} id={'name'} className={'h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm'}/>


      <label htmlFor="name" className="text-sm">Name</label>
      <Input type={'text'} name='name' value={form.name} handleChange={handleChange} id={'name'} className={'h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm'}/>


      <label htmlFor="email" className="text-sm">Email</label>
      <Input type={'email'} name='email' value={form.email} handleChange={handleChange} id={'lname'} className={'h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm'}/>

      <label htmlFohello="password" className="text-sm">Password</label>
      <Input type={'password'} name='password' value={form.password} handleChange={handleChange} id={'password'} className={'h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm'}/>


      <label htmlFor="confirmPassword" className="text-sm ">Confirm Password</label>
      <Input type={'password'} name='confirmPassword' value={form.confirmPassword} handleChange={handleChange} id={'confirmPassword'} className={'h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm'}/>



      <label htmlFor="image" className="text-sm ">Profile Photo</label>
      {/* <Input type={'file'} name='image' value={form.image} handleChange={handleChange} id={'image'} className={'h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm mb-4 p-1'}/> */}

      <input type="file" name = "image" onChange ={handleFileUpload} class="form-control mb-4 "  id="formFile" />

      <Submit id={'submit'} handleSubmit={handleSubmit} required={true} className={'bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm'} value={sub}/><br />
      <p className="text-xs my-2">Already Have an account ?<Link href="/login" className="text-blue-600 ml-2">Login</Link></p>
    </form>
  </div>
</div>

  )
}

export default SignUpForm