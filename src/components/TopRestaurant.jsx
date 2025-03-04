import React from 'react'
import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';


function TopRestaurant({data = [], title}) {
  // console.log(data);

    // const [data, setData] = useState([]);
    const [value, setValue] = useState(0);

    // async function fetchData() {
    //     let response = await fetch(
    //       // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.25050&lng=77.40650&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //     );
    //     let result = await response.json();
    
    //     // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //     setData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    // }
    
    //   //   console.log(data);
    
    // useEffect(() => {
    //     fetchData();
    // }, []);


    function handlePrev() {
        value <= 0 ? "" : setValue((prev) => prev - 31);
    }
    
    function handleNext() {
        value >= 490 ? "" : setValue((prev) => prev + 31);
    }


  return (
    <div className="mt-10 w-full">
      <div className="flex justify-between mt-5">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex gap-3">
          <div
            onClick={handlePrev}
            className="bg-gray-400/20 hover:bg-gray-400/40 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center"
          >
            <i className="text-2xl mt-1 fi fi-rr-arrow-small-left"></i>
          </div>
          <div
            onClick={handleNext}
            className="bg-gray-400/30 hover:bg-gray-400/40 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center"
          >
            <i className="text-2xl mt-1 fi fi-rr-arrow-small-right"></i>
          </div>
        </div>
      </div>

      <div
        style={{ translate: `-${value}%` }}
        className="mt-6 flex gap-8 w-full duration-400"
      >
        {data.map(({info, cta: {link}}) => (
            <div key={info.id} className='hover:scale-95 duration-300 cursor-pointer'>
               <RestaurantCard {...info} link={link}/>
            </div>
        ))}
      </div>

      <hr className="mt-12 text-gray-400/20 border-1" />
    </div>
  );
}

export default TopRestaurant