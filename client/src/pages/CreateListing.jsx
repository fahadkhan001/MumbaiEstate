

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4'>
    <div className='flex flex-col gap-4 flex-1'>
    <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='5' required />
    <input type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' maxLength='62' minLength='15' required />
    <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required />
        <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <span>sell</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <span>Rent</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" />
                <span>Parking</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" />
                <span>Furnished</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" />
                <span>Offer</span>
            </div>
        </div>
        <div className="flex flex-wrap gap-6" >
            <div className="flex items-center gap-2" >
                <input type="number" id="bedrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" required />
                <p>Beds</p>
            </div>
            <div className="flex items-center gap-2" >
                <input type="number" id="bathrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" required />
                <p>baths</p>
            </div>
            <div className="flex items-center gap-2" >
                <input type="number" id="bhk" min='1' max='5' className="p-3 border border-gray-300 rounded-lg" required />
                <p>bhk</p>
            </div>
            <div className="flex items-center gap-2" >
                <input type="number" id="regularprice"  className="p-3 border border-gray-300 rounded-lg" required />
                <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(₹ / Month)</span>
                </div>
            </div>
            <div className="flex items-center gap-2" >
                <input type="number" id="discountprice"  className="p-3 border border-gray-300 rounded-lg" required />
                <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(₹ / Month)</span>
                </div>
            </div>
        </div>
    </div>
    <div className="flex flex-col flex-1 gap-4">
    <p className="font:semibold">Images:
    <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)
    </span>
    </p>
    <div className="flex gap-2">
    <input className="p-3 border border-blue-700 rounded w-full" type="file" id="image" accept="image/*" multiple />
    <button className="p-3 border bg-blue-700 border-blue-950 rounded-lg text-gray-50 uppercase hover:shadow-lg disabled:opcaity-80">Upload</button>
    
    </div>
    <button className="p-3 bg-blue-700 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 ">
    <span className="text-gray-50 font-bold">Create</span> <span className="text-red-400 font-bold">Listing</span>
    </button>
    </div>
    </form>
    </main>
  )
}
