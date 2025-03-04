import React from 'react'

function SearchRes({data: {card: {
    card: {
      info: {
        id,
        cloudinaryImageId,
        costForTwoMessage,
        cuisines,
        promoted = false,
        name,
        avgRating,
        sla: { slaString },
        aggregatedDiscountInfoV3 = {},
      }}}}}) {


  return (
    <div className=''>
        <div className='flex my-3 items-center gap-3 bg-white rounded-2xl p-4 m-4  md:max-w-fit pb-5'>
            <div className='w-[30%] md:w-[30%] relative h-full'>
                <img className='cursor-pointer object-cover rounded-xl aspect-square' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`} alt="" />
                <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2  text-[#ed5e0e] border w-[75%] border-gray-200 rounded-md  text-sm font-bold flex flex-col justify-center items-center bg-[#ffffff]'>
                    <p>{aggregatedDiscountInfoV3.header}</p>
                    <p className='text-[10px]'>{aggregatedDiscountInfoV3.subHeader}</p>
                </div>
            </div>
            <div className='w-[70%] flex flex-col'>
                <p className='line-clamp-1 font-bold text-gray-700'>By {name}</p>
                <div className='flex gap-1 text-gray-600 text-[13px] mt-1'>
                    <i className="fi fi-ss-star"></i>
                    <span>{avgRating}</span>
                    <span>.</span>
                    <span>{slaString}</span>
                    <span>.</span>
                    <span>{costForTwoMessage}</span>
                </div>
                <p className='line-clamp-1'>{cuisines.join(", ")}</p>
            </div>
        </div>
    </div>
  )
}

export default SearchRes;

export function withHoc(WrappedComp){

    return (prop) => {
        // console.log(prop)
        return (
           <div className="relative">
            <p className="absolute z-1 top-8 text-sm bg-gray-700 px-1 left-7 text-white rounded-lg">Ad</p>
            <WrappedComp {...prop} />
           </div>
        )
    }
}