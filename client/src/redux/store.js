import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
export const store = configureStore({
  reducer: {user:userReducer},
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
    //by this we we will not be able to get error for not serializing our variables here    
    serializableCheck:false
  })
})