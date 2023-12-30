import  { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,updateUserFailure,updateUserSuccess,deleteUserFailure,deleteUserSuccess,deleteUserStart, SignOutUserStart, SignOutUserFailure, SignOutUserSuccess } from '../redux/user/userSlice.js'
import {Link}   from 'react-router-dom'


//firebase storage
// allow read;
// allow write:if
// request.resource.size< 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')




export default function Profile() {
  const {currentUser,loading,error} = useSelector((state)=>state.user)
  const [file,SetFile] = useState(undefined)   //if there is a file in the file then we need to upload the image to profile.
  const  fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData, setFormData]= useState({})
  const [updateSuccess, setUpdateSuccess]= useState(false);
  const [showListingError,setShowListingError] =  useState(false);
  const dispatch = useDispatch();
  const [userListings,setUserListings] = useState([]);


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

const handleFileUpload=(file)=>{
//create a storge
 const storage =  getStorage(app);
 //set file name
 const fileName = new Date().getTime() + file.name;
//storage ref  showing which place to save 
const storageRef = ref(storage, fileName)
//creating upload task
const uploadTask = uploadBytesResumable(storageRef,file);

uploadTask.on('state_changed',
(snapshot)=>{
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
  setFilePerc(Math.round(progress));
},
(error)=> {
  setFileUploadError(true);
},
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
    setFormData({...formData, avatar:downloadURL  })
  })
}
);
};

const handleChange=(e)=>{
  setFormData({...formData, [e.target.id]:e.target.value})
}


const handleSubmit=async(e)=>{
e.preventDefault();
try {
  dispatch(updateUserStart());
  const res = await fetch(`/api/user/update/${currentUser._id}`,{
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    body: JSON.stringify(formData),
  })
  const data = await res.json();
  if(data.success === false){
    dispatch(updateUserFailure(data.message));
    return; 
  }
  dispatch(updateUserSuccess(data));
  setUpdateSuccess(true);
  
} catch (error) {
  dispatch(updateUserFailure(error.message))

}
}


const handleDeleteUser = async(e)=>{
  e.preventDefault();
  try {
    dispatch(deleteUserStart());
    const res  = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:"DELETE",
    })
    const data = res.json(res);
    if(data.success==false){
      dispatch(deleteUserFailure(data.message))
      return;
    }
    dispatch(deleteUserSuccess(data));  
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }

}

const handleSignOut=async()=>{
try {
  dispatch(SignOutUserStart(true))
  const res  =await fetch('api/auth/signout/');
  const data = res.json(res);
  if(data.success==false){
    dispatch(SignOutUserFailure(data.message))
    return;
    
  }
  dispatch(SignOutUserSuccess(data))
} catch (error) {
  dispatch(SignOutUserFailure(error.message))
}
}

const handleShowListings= async()=>{
try {
  setShowListingError(false);
  const res = await fetch(`/api/user/listings/${currentUser._id}`);
  const data = await res.json();
  console.log(data)
  if(data.success===false){
    setShowListingError(true);
    return;
  }
  setUserListings(data);
} catch (error) {
  setShowListingError(true)
}
}


const handleListingDelete = async(listingID) =>{
  try {
    const res = await fetch(`/api/listing/delete/${listingID}`,{
      method : 'DELETE',
    })
    const data  = await res.json();
    if(data.success ===false){
      console.log(data.message)
      return;
    }

    //we gonna get the previous data and filter out everthing that dosent match with thid data
    setUserListings((prev)=>
    prev.filter((listing)=> listing._id !==listingID)
    )
  } catch (error) {
    console.log(error.message)
  }
}


  return (
    <div className='p-3 max-w-lg mx-auto' >
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
    <input onChange={(e)=>SetFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>

    <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '  />
    <p className='text-small self-center'>
    {fileUploadError ?(
    <span className='text-red-700'>Error Image Uplaod (Image must be less than 2mb)</span>) :
    filePerc >0 && filePerc< 100 ? (
      <span className='text-slate-700'>{`Uploading ${filePerc}%` }</span>) :
      filePerc ===100 ?(
        <span className='text-green-700'>Image Succesfully uploaded</span>)
        :(
        ""
        )
    }
    </p>
    <input type='text' 
      id='username'
      placeholder='username' 
      defaultValue={currentUser.username}
      onChange={handleChange}
      className='p-3 border rounded-lg '  />
    <input type='email'
     id='email'
     placeholder='email'
     defaultValue={currentUser.email}
     onChange={handleChange}
     className='p-3 border rounded-lg '  />
    <input type='password'
     id='password'
     placeholder='password'
     className='p-3 border rounded-lg '  />
    <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-95s'>{loading? 'Loading...':'Update'}</button>
    <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>Create Listing</Link>
    </form>
    <div className='flex justify-between mt-5'>
    <span onClick={handleDeleteUser} className='text-red-700'>Delete account?</span>
    <span onClick={handleSignOut} className='text-red-700'>Sign out?</span>
    </div>
    <p className='text-red-700'>{error? error :""}</p>
    <p className='text-green-700 mt-5'>{updateSuccess? 'User updated succesfully' :""}</p>
    <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listings</button>
    <p className='text-red-700 mt-5'>{showListingError?'Error showing listings' :''}</p>
    {userListings && 
    userListings.length >   0 && 
      <div className='flex flex-col gap-4'>
      <h1 className='text-center mt-7 text-2xl'>Your Listings</h1>
      {userListings.map((listing)=>(
      <div key={listing._id} className=' border rounded-lg p-3 flex justify-between items-center gap-0'>
      <Link to={`/listing/${listing._id}`}>
      <img
        src={listing.imageURLs[0]}
        alt='listing cover'
        className='h-16 w-16 object-contain'
      />
    </Link>
    <Link className='flex-1 text-slate-700 font-semibold  hover:underline truncate' to={`/listings/${listing._id}`}>
    <p >{listing.name}</p>
    </Link>
  
        <div className='flex flex-col items-center'>
        {/*Since we need to delete the id we need to use callback and pass id as reference */}
        <button onClick={()=>handleListingDelete(listing._id)} className='tect-red-700 uppercase'>Delete</button>
        <button className='tect-green-700 uppercase'>Edit</button>
        </div>
    
      </div>
      ))}
      </div>}
    </div>
  )
}
