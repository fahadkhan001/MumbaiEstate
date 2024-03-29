import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper , SwiperSlide} from 'swiper/react';
import { Navigation} from 'swiper/modules';
import SwiperCore  from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios'

import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

const Listing = () => {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, SetError]  = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact,setContact]= useState(false);
    const {currentUser} = useSelector((state)=>state.user)

    const params = useParams();
    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                setLoading(true);
                const res  = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json();
                if(data.success === false)
                {
                    SetError(true);
                    return;
                }
                setListing(data);
                setLoading(false);
                SetError(false);
            } catch (error) {
                SetError(true)
                setLoading(false);
            }
        }   
        fetchListing();
    },[params.listingId])

const handlebuynow=async(amount)=>{
    const {data:{key}}= await axios.get("http://localhost:3000/api/payment/getkey") 
    
    const {data:{order}}= await axios.post("http://localhost:3000/api/payment/checkout",{amount})
    console.log(order)
  
        const options  ={
            key,
            amount :order.amount,
            currency:"INR",
            name:"fahad_07",
            description:"Razorpay learning",
            image:"https://avatars.githubusercontent.com/u/97621401?s=400&v=4",
            order_id :order.id,
            callback_url:"http://localhost:3000/api/payment/verification",
            prefill:{
              name:"example",
              email:"example.com",
              contact:"1234567890",
  
            },
            notes:{
              "address":"razorpay official"
            },
            theme:{
              "color":"#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
   
}

  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>loading...</p>}
        {error &&  (<p className='text-center my-7 text-2xl'>Something went wrong!</p>)}

        {listing && !error && !loading && 
            <div>
            <Swiper navigation>
                {listing.imageURLs.map((url) => (
                    <SwiperSlide key={url}>
                    <div className='h-[800px]' style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover  '}}></div>  
                    </SwiperSlide>
                ))}
            
            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare 
            className='text-slate-500' 
            onClick={()=>{
                navigator.clipboard.writeText(window.location.href)
                setCopied(true);
                setTimeout(()=>{
                    setCopied(false);

                },2000)
            }}
            />
            </div>

            {copied &&(
            
                <p className='fixed-top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>Link Copied</p>
            )}

            <div className='flex flex-col  max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
            {listing.name} - ₹{' '}
            {listing.offer 
                
                ? listing.discountPrice.toLocaleString('en-IN')
                :listing.regularPrice.toLocaleString('en-IN')
            }
            {listing.type === 'rent'  && ' / month'}
            </p>

            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
            <FaMapMarkedAlt className='text-green-700'/>
            {listing.address} 
            </p>

            <div className='flex gap-4 '>
            {listing.offer && (
                <p className='bg-red-900 w-full max-w-[150px] text-white text-center p-7 rounded-md'>{listing.type==='rent'? 'For Rent':'For sale'}</p>
            )}
            {listing.offer && (
                <div className='bg-green-900 w-full max-w-[180px] text-white text-center p-5  rounded-md'>
                <p className=''>₹{+listing.regularPrice - +listing.discountPrice} OFF</p>
                <p className='line-through '> ₹ {listing.regularPrice}</p>
                </div>
            )}  
<button onClick={()=>handlebuynow(listing.regularPrice)}  className='bg-blue-700 text-white p-3 border-white hover:scale-105  rounded-lg max-w-[100px] w-full'>Buy now {listing.discountPrice}</button>  

            </div>
            <p className='text-slate-800'>
            <span className='font-semibold text-black'>Description - {' '}</span>
            {listing.description}</p>
            <ul className=' text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaBed className='text-lg' />
            {listing.bedrooms >1 ? `${listing.bedrooms} beds` : `${listing.bedrooms}bed`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaBath className='text-lg' />
            {listing.bathrooms >1 ? `${listing.bathrooms} baths` : `${listing.bathrooms}bath`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaParking className='text-lg' />
            {listing.parking ? 'Parking':'No Parking'}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
            <FaChair className='text-lg' />
            {listing.furnished ? 'Furnished' : "Unfurnished"}
            </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact &&(
            <button onClick={()=>setContact(true)} className='bg-blue-700 text-gray-50 rounded-lg uppercase hover:opacity-95 p-3'>Contact Owner</button>
            )}
            {contact && <Contact listing={listing} />}
            </div>  


            </div> 
        
        }
    
    </main>
  )
}

export default Listing