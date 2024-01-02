import {FaSearch} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Header() {
  const {currentUser}= useSelector(state=>state.user)
  const [searchTerm,setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
  //react has a built in javascript constructor for the string we need to add after search term
  const urlParams =  new URLSearchParams(window.location.search);
  //when we have all the terms we need to change its search term
  urlParams.set('searchTerm',searchTerm); 
  //we need to convert the urlparam to string coz we can have number s also
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);

  }

  // we use useeffect so that eevrytome we change our serach term it hcanges
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])


  return (
    <header className='bg-blue-700 shadow-md '>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <Link to="/">
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
    <span className='text-gray-50' >Mumbai</span>
    <span className='text-red-400' >Estate</span>
    </h1>
    </Link>
    {/*Search bar */}

    <form onSubmit={handleSubmit} className='bg-blue-600 p-3 rounded-lg flex items-center'>
    <input type='text' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}  placeholder='Search...' className='bg-transparent text-white focus:outline-none w-24 sm:w-64'/> {/*to remove the outline we need to use focus:outlinenone */}
    <button>
    <FaSearch className='text-blue-400 '/>
    </button>
    </form>


    <ul className='flex gap-4 '>
    <Link to="/">
    <li className='hidden sm:inline text-gray-50 hover:bg-emerald-800' >Home</li>
    </Link>
    <Link to="/about">
    <li className='hidden sm:inline text-gray-50 hover:bg-emerald-800' >About</li>
    </Link>
    <Link to="/profile">
    {currentUser ? (
      <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
    ): (
      <li className=' text-gray-50 hover:bg-emerald-800' >Sign-In</li>
  )}
  </Link>
    
   
    
    </ul>
    </div>
    
    </header>
  )
}
