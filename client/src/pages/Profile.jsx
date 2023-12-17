import  { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,updateUserFailure,updateUserSuccess,deleteUserFailure,deleteUserSuccess,deleteUserStart, SignOutUserStart, SignOutUserFailure, SignOutUserSuccess } from '../redux/user/userSlice.js'

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
  const dispatch = useDispatch();
  


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
    </form>
    <div className='flex justify-between mt-5'>
    <span onClick={handleDeleteUser} className='text-red-700'>Delete account?</span>
    <span onClick={handleSignOut} className='text-red-700'>Sign out?</span>
    </div>
    <p className='text-red-700'>{error? error :""}</p>
    <p className='text-green-700 mt-5'>{updateSuccess? 'User updated succesfully' :""}</p>
    </div>
  )
}
