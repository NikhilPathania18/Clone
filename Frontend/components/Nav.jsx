"use client"
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";


const Nav = () => {

    const pathName = usePathname()
    const router = useRouter();
    const [toggleDropdown,setToggleDropDown]=useState(false);
    const [signedIn,setSignedIn] = useState(false)
    const [userData, setUserData]= useState({})

    const signOut = () =>{
        localStorage.removeItem('userData')
        setSignedIn(false)
        router.push('/')
    }

    useEffect(()=>{
            let data = localStorage.getItem('userData');
            if(!data)   setSignedIn(false);
            else{
                data=   JSON.parse(data)
                setUserData(data);
                setSignedIn(true);
            }
    },[])
  return (
    <nav className="flex-between w-full mb-4 p-3 pt-5 ">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
                src="/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text ">Twitter</p>
        </Link>


        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {signedIn ? (
                <div className="flex gap-3 md:gap-5 pr-5">
                    <Link href="/create-tweet" className="black_btn">
                        Create Post
                    </Link>

                    <button type="button" onClick={signOut} className="outline_btn"> Sign Out</button>

                    <Link href="/profile">
                        <Image
                            src={userData?.userData?.profilePhoto}
                            width={37}
                            height={37}
                            className="rounded-full w-12 h-12"
                            alt="profile"
                        />
                    </Link>
                </div>
            ):(
                <>
                    <button
                        type='button'
                        onClick={()=> {
                            router.push('/login')
                        }}
                        className="black_btn"
                    >
                        Sign In
                    </button>
                </>
            )}

            
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative" >
                {signedIn ? (
                    <div className="flex">
                        <Image
                            src={userData?.userData?.profilePhoto}
                            width={37}
                            height={37}
                            className="rounded-full w-12 h-12"
                            alt="profile"
                            onClick={()=>setToggleDropDown((prev)=> !prev)}
                        />

                        {toggleDropdown &&(
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    classname="dropdown_link"
                                    onClick={()=> setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-tweet"
                                    className="dropdown_link"
                                    onClick={()=> setToggleDropDown(false)}
                                >
                                        Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    onClick={()=>{
                                        setToggleDropDown(false);
                                        signOut();
                                    }}
                                    classname="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ):(
                <>
                    {
                        <button
                            type='button'
                            onClick={()=> {
                                router.push('/login')
                            }}
                            className="black_btn"
                        >
                            Sign In
                        </button>
                    }
                </>)}
            </div>
    </nav>
  );
}

export default Nav;
