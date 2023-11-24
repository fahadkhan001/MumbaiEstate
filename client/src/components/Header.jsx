import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function Header() {
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

    <form className='bg-blue-600 p-3 rounded-lg flex items-center'>
    <input type='text'  placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/> {/*to remove the outline we need to use focus:outlinenone */}
    <FaSearch className='text-blue-400 '/>
    </form>
    <ul className='flex gap-4 '>
    <Link to="/">
    <li className='hidden sm:inline text-gray-50 hover:bg-emerald-800' >Home</li>
    </Link>
    <Link to="/about">
    <li className='hidden sm:inline text-gray-50 hover:bg-emerald-800' >About</li>
    </Link>
    <Link to="/sign-in">
    <li className='sm:inline text-gray-50 hover:bg-emerald-800' >Sign-In</li>
    </Link>
    </ul>
    </div>
    
    </header>
  )
}
