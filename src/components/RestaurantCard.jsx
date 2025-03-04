import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard(info) {

    // console.log(info.link.split("/"));


  return (
    <Link to={`/restaurantMenu/${info?.link.split("/").at(-1)}`}>
        <div className="min-w-[273px] h-[183px] relative">
                <img className="w-full h-full  rounded-2xl object-cover cursor-pointer" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + info?.cloudinaryImageId} alt=""/>
                <div className="bg-gradient-to-t from-black from-1% to-transparent to-20% w-full h-full absolute top-0 rounded-2xl"></div>
                <p className='absolute bottom-0 text-white text-xl font-bold ml-2 mb-2'>{
                    info?.aggregatedDiscountInfoV3?.subHeader ? info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader : ""
                }</p>
        </div>

        <div className='mt-1'>
                <h2 className='line-clamp-1 font-bold text-lg overflow-hidden text-ellipsis'>{info?.name}</h2>
                <p className='line-clamp-1 flex items-center gap-1 font-normal text-base'><i className="text-green-700 mt-1 text-xl fi fi-sr-circle-star"></i> {info?.avgRating} <span className='font-semibold'> . {info?.sla?.slaString}</span></p>
                <p className='text-gray-600 line-clamp-1'>{info?.cuisines.join(", ")}</p>
                <p className='text-gray-600 line-clamp-1'>{info?.areaName}</p>
        </div>
    </Link>
    // <div>heloo</div>
  )
  
}

export default RestaurantCard