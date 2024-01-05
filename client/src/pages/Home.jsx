import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore  from 'swiper'
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import ListingCard from '../components/ListingCard';

export default function Home() {
  //we need 3 state for listings
  const [offerListings,setOfferListings]= useState([]);
  const [saleListings,setSaleListings]= useState([]);
  const [rentListings,setRentListings]= useState([]);
  SwiperCore.use([Navigation])


//we gonna fetch the above state using useEffect
//we are going to run  only 1 time
  useEffect(()=>{
    const fetchOfferListings =async()=>{
      try {
        const res  = await fetch('/api/listing/get?offer=true&limit-4')
        const data = await res.json()
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    };
// we dont want everything at the same ttime we enter this page hence we need function for this
//we need rthis data to come one by one hence we will give this function in above function

  const fetchRentListings = async()=>{
    try {
      const res  = await fetch('/api/listing/get?type=rent&limit-4')
      const data = await res.json()
      setRentListings(data);
      fetchSaleListings
    } catch (error) {
      console.log(error)
    }
  };
    
  

  const fetchSaleListings = async()=>{
    try {
      const res  = await fetch('/api/listing/get?type=sale&limit-4')
      const data = await res.json()
      setSaleListings(data);
    } catch (error) {
      console.log(error)
    }
  };
    fetchOfferListings();
},[]);





  return (
    <div className=''>
    {/*top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-red-700 font-bold text-3xl lg:text-6xl'>Your story <span className='text-blue-700'>begins</span> here</h1>
      
      <div className='text-gray-400 text-sm sm:text-sm'>
      Mumbai Estate your doorway to dream homes awaits. Explore curated properties, redefine your lifestyle, and discover the perfect address for your aspirations. Elevate your living with us.
      <p className='font-bold'>Your Home, Your Story.Let's Begin the Next Chapter Together!</p>
      </div>
      <Link to={'/search'} className='text-xs sm:text-sm text-blue-900 font-bold hover:underline'>
      Ignite your curiosity...
      </Link>
      </div>


    {/*swiper */}
    <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageURLs[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>


  {/*listing results for ofefr,sale adn rent */}
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings &&  offerListings.length > 0 &&(
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                {/*we ned them to see more so we will navigate to search where offer is true */}
                <Link className='text-sm text-blue-800 hover:underline' to={'/search/offer=true'}>Show more offers...
                </Link>
              </div>
              <div className='flex flex-wrap gap-10'>
              {
                offerListings.map((listing)=>(
                  <ListingCard listing={listing} key={listing._id} />
                ))
              }
              </div>
            </div>
          )

        }
        {
          rentListings &&  rentListings.length>0 &&(
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for Rent</h2>
                {/*we ned them to see more so we will navigate to search where offer is true */}
                <Link className='text-sm text-blue-800 hover:underline' to={'/search/type=rent'}>Show more places for rent...
                </Link>
              </div>
              <div className='flex flex-wrap gap-10'>
              {
                rentListings.map((listing)=>(
                  <ListingCard listing={listing} key={listing._id} />
                ))
              }
              </div>
            </div>
          )

        }
        {
          saleListings &&  saleListings.length>0 &&(
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                {/*we ned them to see more so we will navigate to search where offer is true */}
                <Link className='text-sm text-blue-800 hover:underline' to={'/search/type=sale  '}>Show more places for sale...
                </Link>
              </div>
              <div className='flex flex-wrap gap-10'>
              {
                saleListings.map((listing)=>(
                  <ListingCard listing={listing} key={listing._id} />
                ))
              }
              </div>
            </div>
          )

        }

        </div>

    </div>
  )
}
