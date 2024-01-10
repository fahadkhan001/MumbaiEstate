import React, { useState } from 'react'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth,RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



const PhoneNumber = () => {
  const [phone, setPhone] = useState("");
  const [user,setUser] = useState(null);
  const [otp,setOtp] = useState("");
  const [formData , setFormData] = useState({})
  const [loading,setLoading]= useState(false);
  const [error,setError]= useState(null);
  const navigate = useNavigate()

const auth = getAuth(app);

const sendOtp = async()=>{
  try {
  const recaptcha = new RecaptchaVerifier(auth, 'recaptcha',{});
  const confirmation =await signInWithPhoneNumber(auth,phone,recaptcha)
  setUser(confirmation)
  console.log(confirmation)
  } catch (error) {
    console.log(error)
  }
}
const verifyOtp = async()=>{
//we need to get the confirmation hence we need a state
//we need to confirm and confirm is there in confirmation'
try {
 const data = await user.confirm(otp) ;
 if(data.success ===false){
  setLoading(false)
  setError(error.message)
  return
 }
 setLoading(false);
 navigate('/')

console.log(data)
  
} catch (error) {
setLoading(false);
setError(error.message)
}
}
const handleChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.id] : e.target.value

  })
}
const handleSubmit =async(e)=>{
e.preventDefault();
try {
  setLoading(true)
const res = await fetch('/api/auth/phoneNumbers',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(formData)
})
const data = await res.json();
console.log(data)
if(data.success===false){
setLoading(false);
setError(data.message)
return
  }
setLoading(false)
} catch (error) {
  setLoading(false)
  setError(error.message)
}

}

  return (
    
    <div className=' p-6 max-w-xl mx-auto mt-[100px] items-center  rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-shadow overflow-hidden sm:md-[500px]   border border-solid  gap-4 flex flex-col'>
    <h1 className='font-bold text-blue-700 text-3xl '>Phone Number Verification</h1>
   <form onSubmit={handleSubmit}>
    <div className='flex flex-col items-center gap-4'>
    <input className=' w-72 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none   focus:border-blue-600 peer ' type='text' placeholder='Enter name' id='username' onChange={handleChange}    />
      <input className='block w-72 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none   focus:border-blue-600 peer  ' type='email' placeholder='Enter email' id='email' onChange={handleChange}    />
      <input className='block w-72 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none   focus:border-blue-600 peer  ' type='password' placeholder='Enter password' id='password' onChange={handleChange}    />
      <div>
          <PhoneInput   country={'in'} onChange={(phone)=>setPhone("+" + phone)}  value={phone} inputProps={PhoneNumber} />
          </div>
        <button disabled={loading} onClick={sendOtp} className='border border-red-700 p-2 bg-blue-600 text-white items-center uppercase'>{loading ?'OTP sent':'Send OTP'}</button>
        <div id='recaptcha'></div>
        <div className='flex flex-wrap gap-2 items-center'>
          <input type='text' onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP' className='block w-70 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none   focus:border-blue-600 peer ' />
          <button onClick={verifyOtp} className='border p-2  bg-red-700 text-white'>Verify Otp</button>
        </div>
        </div>
        </form>
      </div>
    
  
  )
}

export default PhoneNumber