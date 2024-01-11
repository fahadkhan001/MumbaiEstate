import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function Ogit() {
 const navigate= useNavigate();
 const dispatch = useDispatch();
 const handleGithubClick = async()=>{
    try {
    const auth = getAuth(app);
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth,provider)
    console.log(result)
    const res = await fetch('/api/auth/github',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo:result.user.photoURL,
        }),

    })
    const data = await res.json();
    dispatch(signInSuccess(data))
    navigate('/')
    
    } catch (error) {
        console.log("could not sign in  with github",error)
    }
 }

  return (
    <button  onClick={handleGithubClick} type='button' className='bg-[#24292e] text-white p-3 rounded-lg hover:opacity-90' >Continue with Github  </button>
  )
}
