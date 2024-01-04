import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [listings,setListings] = useState([])
    const [sidebardata,setSideBarData] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:"created_at",
        order:'desc',


    })
//console.log(sidebardata)

console.log(listings)
useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const typeFormUrl = urlParams.get('type')
    const parrkingFromUrl= urlParams.get('parking')
    const furnishedFromUrl=urlParams.get('furnished')
    const offerFromUrl= urlParams.get('offer')
    const sortFromUrl=urlParams.get('sort')
    const orderFromUrl=urlParams.get('order')


    //if there is change in anything we need it in searchterm
    if(searchTermFromUrl||
        typeFormUrl||
        parrkingFromUrl||
        furnishedFromUrl||
        offerFromUrl||
        sortFromUrl||
        orderFromUrl
        ){
            setSideBarData({
                searchTerm:searchTermFromUrl || '',
                type:typeFormUrl || 'all',
                parking:parrkingFromUrl ==='true'?true:false,
                furnished:furnishedFromUrl === 'true'?true:false,
                offer:offerFromUrl === 'true'?true:false,
                sort:sortFromUrl || 'created_at',
                order:orderFromUrl||'desc'
            })
        }

        const fetchListings = async()=>{
            setLoading(true);
            //we want the updated url in useparams in useefect
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json();
            setListings(data);
            setLoading(false);
        }

        fetchListings();
},[location.search])

const handleChange=(e)=>{
 if(
    e.target.id==='all' ||e.target.id==='rent' ||e.target.id==='sale')  {
    setSideBarData({...sidebardata, type: e.target.id});
    }

    if (e.target.id === 'searchTerm') {
        setSideBarData({ ...sidebardata, searchTerm:e.target.value });
      }

    if(e.target.id==='parking' || e.target.id ==='furnished' || e.target.id==='offer'){
        setSideBarData({
            ...sidebardata,
            [e.target.id]:e.target.checked || e.target.checked==='true'?true:false,

        });
    }

    if(e.target.id==='sort_order'){
        const sort = e.target.value.split('_')[0] || 'created_at';
        
        
        const order = e.target.value.split('_')[1] || 'desc';

        setSideBarData({
            ...sidebardata,
            sort,order
        })
        
    }
}


const handleSubmit =(e)=>{
    e.preventDefault();
//we need to get the url 
    const urlParams =  new URLSearchParams();
    urlParams.set('searchTerm',sidebardata.searchTerm);
    urlParams.set('type',sidebardata.type);
    urlParams.set('parking',sidebardata.parking);
    urlParams.set('furnished',sidebardata.furnished);
    urlParams.set('offer',sidebardata.offer);
    urlParams.set('sort',sidebardata.sort);
    urlParams.set('order',sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?  ${searchQuery}`)
}
  return (
    <div className='flex flex-col md:flex-row'>
        <div className=' bg-blue-500 p-7 border-b-2 md:border-r-2 md:min-h-screen '> 
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <input type='text' id='searchTerm' value={sidebardata.searchTerm} onChange={handleChange}  placeholder='Search...' className='border rounded-lg p-3 w-full'/>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sidebardata.type==='all'}/>
                    <span> Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={sidebardata.type==='rent'}/>
                    <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebardata.type==='sale'}/>
                    <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={sidebardata.offer}/>
                    <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={sidebardata.parking}/>
                    <span>parking</span>
                    </div>
                    <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={sidebardata.furnished}/>
                    <span>furnished</span>
                    </div>
                </div>
                <div className='flex gap-2  items-center'>
                <label className='font-semibold'>Sort:</label>
                <select id='sort_order' className='border rounded-lg p-3' onChange={handleChange} defaultValue={'created_at_desc'}>
                <option value={'regularPrice_desc'}>Price high to low</option>
                <option  value={'regularPrice_asc'}>Price low to high</option>
                <option  value={'createdAt_desc'}>Latest</option>
                <option value={'createdAt_asc'}>Oldest  </option>
                </select>
                </div>
            <button className='bg-blue-700 text-gray-50 border border-red-700  p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>

        <div className=''> 
        <h1 className='text-3xl font-semibold border-b p-3 text-blue-500 mt-5'>Listing Results:</h1>
        </div>
    
    </div>
  )
}
