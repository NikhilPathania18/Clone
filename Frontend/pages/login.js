'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Login() {
    const [form, setForm] = useState({email:'', password:''})
    const router = useRouter();
    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/login',form)
            if(res && res.data.success){
                console.log(res)
                const data = {
                  token: res.data.token,
                  userData: res.data.user
                }
                localStorage.setItem('userData',JSON.stringify(data))
                toast.success(res.data.message);
                router.push('/')
            }
            else{
                toast.error("Something went wrong..")
            }
        }
        catch{
            toast.error("Something went wrong")
        }
    }
  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
  <div id="form" className="m-5 block bg-slate-50 p-6 rounded-xl shadow-md shadow-slate-300 w-80">
    <form onSubmit={handleSubmit}>
      <h2 className="text-blue-700 text-3xl font-semibold my-4">Login</h2>
      <label htmlFor="email" className="text-sm">Email</label>
      <input autoFocus required type="text" onChange={handleChange} value={form.email} name="email" id="email" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm" />
      <label htmlFor="password" className="text-sm">Password</label>
      <input required type="password" onChange={handleChange} value={form.password} name="password" id="password" className="mb-2 h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm" />
      <input type="submit" name id="signUp" className="bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm" /><br />
      <p className="text-xs my-2">New User?<Link href="/signup" className="text-blue-600 ml-2">Sign Up</Link></p>
    </form>
  </div>
</div>

  )
}

export default Login