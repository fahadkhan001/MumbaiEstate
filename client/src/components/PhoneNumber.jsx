import {BsFillShieldLockFill} from 'react-icons/bs'
import { getAuth } from "firebase/auth";
const PhoneNumber = () => {
    
const auth = getAuth();
auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();
  return (
    
    <button onClick={handlesubmit} className=" bg-blue-700 text-white p-3 rounded-lg text-center hover:opacity-90 ">Continue with PhoneNumber</button>
    
    
  )
}

export default PhoneNumber;