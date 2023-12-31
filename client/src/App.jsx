import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoutes from './components/PrivateRoutes';
import CreateListing from './pages/CreateListing';
import UpdateListings from './pages/UpdateListings';
import Listing from './pages/Listing';


export default function App () {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/sign-in' element={<Signin />} />
  <Route path='/sign-up' element={<SignUp />} />
  <Route path='/about' element={<About />} />
  {/*Based in the listing id we gonna fetch it hence we are using :listingId  */}
  <Route path='/listing/:listingId' element={<Listing />} />
  <Route element={<PrivateRoutes />} >
  <Route path='/profile' element={<Profile />} />
  <Route path='/create-listing' element={<CreateListing />} />
  <Route path='/update-listing/:listingId' element={<UpdateListings />} />
  </Route>
  </Routes>
  </BrowserRouter>
  )
  
}

