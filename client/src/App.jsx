import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoutes from './components/PrivateRoutes';


export default function App () {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/sign-in' element={<Signin />} />
  <Route path='/sign-up' element={<SignUp />} />
  <Route path='/about' element={<About />} />
  <Route element={<PrivateRoutes />} >
  <Route path='/profile' element={<Profile />} />
  </Route>
  </Routes>
  </BrowserRouter>
  )
  
}

