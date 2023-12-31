import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper , SwiperSlide} from 'swiper/react';
import { Navigation} from 'swiper/modules';
import SwiperCore  from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';


const Listing = () => {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, SetError]  = useState(false);

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
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>loading...</p>}
        {error &&  (<p className='text-center my-7 text-2xl'>Something went wrong!</p>)}

        {listing && !error && !loading && 
            <div>
            <Swiper navigation>
                {listing.imageURLs.map((url) => (
                    <SwiperSlide key={url}>
                    <div className='h-[500px]' style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover'}}></div>  
                    </SwiperSlide>
                ))}
            
            </Swiper>
            </div> 
        
        }
    
    </main>
  )
}

export default Listing