import { useState, useEffect, useContext } from 'react';
import OnYourMind from './OnYourMind';
import TopRestaurant from './TopRestaurant';
import OnlineFoodDelivery from './OnlineFoodDelivery';

import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';
import useRestaurantData from '../hooks/useRestaurantData';


function Body() {

  const [topRestaurantData, onYourMindData, topResTitle, onlineTitle, searchData] = useRestaurantData()

  

  const filterValue = useSelector((state) => state.filterSlice.filterVal);
  // console.log(topRestaurantData);

  const filteredData = topRestaurantData.filter((item) => {
      if(!filterValue) return true;

      switch(filterValue) {
        case "Ratings 4.0+" : return item?.info?.avgRating > 4
        case "Offers" : return item?.info?.aggregatedDiscountInfoV3?.header
        case "Rs. 300-Rs. 600" : return (item?.info?.costForTwo.split(" ")[0].slice(1) >= "300" && item?.info?.costForTwo.split(" ")[0].slice(1) <= "600")
        case "Less than Rs. 300" : return item?.info?.costForTwo.split(" ")[0].slice(1) < "300"

        default : return true;
      }
  })


  if(searchData.communication){
    return (
      
      <div className='mt-20 overflow-hidden flex flex-col justify-center items-center text-center gap-1'>
        <img className='w-60' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
        <h1 className='mt-4 text-xl font-bold'>Location Unserviceable</h1>
        <p className='font-medium text-gray-600 w-[360px]'>We don’t have any services here till now. Try changing location.</p>
      </div>
      
    )
  }

     
  return (
    <div className='w-full h-full'>
      {
        topRestaurantData.length ? (
        <div className='w-[95%] md:w-[80%] mx-auto  overflow-hidden mb-5'>
          {onYourMindData.length ? (
              <>
                  <OnYourMind data={onYourMindData} />
                  <TopRestaurant
                      data={topRestaurantData}
                      title={topResTitle}
                  />
              </>
          ) : (
              ""
          )}
      
      <OnlineFoodDelivery data={filterValue ? filteredData : topRestaurantData} title={onlineTitle}/>
  
        </div>
        ) : (
          <Shimmer />
        )
      }
        
    </div>
  )
}



export default Body;

