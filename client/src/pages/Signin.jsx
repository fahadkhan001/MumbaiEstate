import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'
import OAuth from '../components/OAuth';
import PhoneNumber from '../components/PhoneNumber';
import { FaUser,FaLock } from "react-icons/fa";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const  dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className='text-black h-[100vh] flex justify-center items-center bg-cover'  style={{"backgroundImage":"url('../assets/mumbai.jpg')"}}>
    <div className='p-3 max-w-lg mx-auto border-[1.5px] rounded-lg border-black mt-3  shadow-md hover:shadow-lg hover:scale-105 transition-shadow overflow-hidden  w-full sm:w-[500px] h-[500px]'>
      <h1 className=' text-blue-600 text-5xl text-center font font-semibold my-3 '>Mumbai <span className='text-red-700'>Estate</span></h1>
      <h4 className='text-3xl text-center font-semibold my-3 '>Login</h4>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2 items-center'>
      <div className='flex items-center '>
      <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg w-[445px]'
          id='email'
          onChange={handleChange}
        />
        <FaUser className='relative right-8' />
        </div>
        <div className='flex items-center '>
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg w-[445px]'
          id='password'
          onChange={handleChange}
        />
        <FaLock className='relative right-8'/>
        </div>
        </div>
        


        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          onClick={()=>navigate('/sign-up')}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        <OAuth/>
        
        
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      
    </div>
    </div>
  );
}