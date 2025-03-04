import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Discount from './Discount';
import MenuCard from './MenuCard';
import { coordinates } from '../context/context';
import { MenuShimmer } from './Shimmer';
import useMenuData from '../hooks/useMenuData';


function RestaurantMenu() {

  const [value, setValue, setCurrIndex, resInfo, discountData, topPicksData, menuData, currIndex] = useMenuData();
  

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }

  function handleNext() {
    value >= 120 ? "" : setValue((prev) => prev + 31);
  }

  function toggleFunc(i) {
    // console.log(i);
    setCurrIndex(i === currIndex ? null : i);
  }

  return (
    <div className='w-full'>
      {
        menuData.length ? (
          <div className='w-[95%] md:w-[800px] mx-auto pt-7 overflow-hidden'>
            <p className='text-[11px] font-medium'><Link to={"/"}><span className='cursor-pointer text-gray-500 hover:text-black'>Home /</span></Link><Link to={"/"}><span className='cursor-pointer text-gray-500 hover:text-black'> {resInfo?.city} /</span></Link><span> {resInfo?.name}</span></p>
            <h1 className='pt-10 pl-2 text-3xl font-bold'>{resInfo?.name}</h1>
            <div className='w-full h-[186px] p-4 bg-gradient-to-t from-gray-300/80 rounded-[35px] mt-3'>
              <div className='bg-white border px-4 pb-4 border-gray-300/80 rounded-2xl w-full h-full '>
                  <p className='flex items-center gap-1 text-base font-bold'><i className="text-green-700 mt-1 text-xl fi fi-sr-circle-star"></i> {resInfo?.avgRating} <span>({resInfo?.totalRatingsString})</span> <span className='text-gray-400 pb-3 text-xl'>.</span> <span>{resInfo?.costForTwoMessage}</span></p>
                  <p className='cursor-pointer underline text-sm text-orange-600 font-bold'>{resInfo?.cuisines?.join(',')}</p>
           
                  <div className='flex pt-3 gap-3'>
                    <div className='w-[8px] flex flex-col justify-center items-center'>
                       <div className='w-[6px] h-[6px] bg-gray-400/70 rounded-full'></div>
                       <div className='w-[1px] h-[23px] bg-gray-400/70'></div>
                       <div className='w-[6px] h-[6px] bg-gray-400/70 rounded-full'></div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <span className='text-sm font-bold'>Outlet</span>
                            <span className='text-sm font-medium text-gray-500'>{resInfo?.areaName}</span>
                        </div>
                        <p className='text-sm'><span className='font-bold'>RestaurantId: </span> <span className='text-sm font-medium text-gray-500'>{resInfo?.feeDetails?.restaurantId}</span></p>
                    </div>
                  </div>

                  <hr className='mt-3 border-1 text-gray-300' />   
              </div>
            </div>


            <div className=" w-full p-4">
                <div className="flex justify-between mt-5">
                    <h1 className="text-xl font-bold">Deals for you</h1>
                    <div className="flex gap-3">
                      <div onClick={handlePrev} className="bg-gray-400/20 hover:bg-gray-400/40 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center">
                           <i className="text-2xl mt-1 fi fi-rr-arrow-small-left"></i>
                      </div>
                      <div onClick={handleNext} className="bg-gray-400/30 hover:bg-gray-400/40 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center">
                           <i className="text-2xl mt-1 fi fi-rr-arrow-small-right"></i>
                      </div>
                    </div>   
                </div>

                {/* {console.log(discountData)} */}

                <div style={{ translate: `-${value}%` }}  className="mt-6 flex gap-4 w-full duration-400">
                    {
                      Array.isArray(discountData) && discountData.length > 0 ? 
                        discountData.map(({info}, i) => (
                            <Discount info={info} key={i}/>
                        ))
                        :
                        ""
                        
                        
                    }
                </div>
            </div>

            <div className='w-full p-4'>
                <h2 className='text-center mt-5 font-medium text-gray-500/95'>MENU</h2>
                <Link to={"/search"}>
                <div className='w-full mt-5 relative cursor-pointer'>
                   <div className='w-full p-3 rounded-xl font-semibold text-gray-600/90 text-center bg-gray-200/50'>Search for dishes</div>
                   <i className="mt-2 fi fi-bs-search absolute right-5 top-1 text-gray-500/80"></i>
                </div>
                </Link>


                <hr className='mt-15 text-gray-300'/>
            </div>

{/* top picks */}

          { topPicksData &&
            <div className=" w-full p-4 ">
                <div className="flex justify-between ">
                    <h1 className="text-xl font-bold">{topPicksData?.card?.card?.title}</h1>
                    <div className="flex gap-3">
                      <div onClick={handlePrev} className="bg-gray-400/20 hover:bg-gray-400/40 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center">
                           <i className="text-2xl mt-1 fi fi-rr-arrow-small-left"></i>
                      </div>
                      <div onClick={handleNext} className="bg-gray-400/30 hover:bg-gray-400/40 cursor-pointer w-9 h-9 rounded-full flex justify-center items-center">
                           <i className="text-2xl mt-1 fi fi-rr-arrow-small-right"></i>
                      </div>
                    </div>   
                </div>

                <div style={{ translate: `-${value}%` }}  className="mt-6 flex gap-4 w-full duration-400 ">
                    {
                        topPicksData?.card?.card?.carousel.map(({creativeId, dish: {info: {price, defaultPrice, id}}}) => (
                            // <Discount info={info}/>
                            // console.log(data)
                            <div key={id} className='min-w-[384px] h-[395px] relative'>
                                <img className='w-full h-full' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`} alt="" />
                                <div className='flex gap-44 items-center absolute bottom-10 left-6'>
                                   <p className='text-white font-semibold text-lg'>₹{defaultPrice/100 || price/100}</p>
                                   <button  className='cursor-pointer hover:bg-gray-200 duration-300 bg-white border drop-shadow-xl border-gray-300 px-10 py-[6px] font-bold text-lg text-green-600 rounded-[11px] '>ADD</button>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
          }



           {/* {console.log(menuData)} */}


            {
              Array.isArray(menuData) && menuData.length > 0 ? 
                menuData.map(({card: {card}}, i) => (
                    // method-1
                    // <div key={i}>
                    //     <div className='flex justify-between items-center'>
                    //         <h1 className='text-lg font-bold'>{title} ({itemCards.length})</h1>
                    //         <i className="text-2xl fi fi-rr-angle-small-down" onClick={() => toggleFunc(i)}></i>
                    //     </div>
                      
                    //    {/* <h2>{console.log(itemCards)}</h2> */}
                       
                    // {     
                    //     currIndex === i &&      
                    //     <div className='mt-5'>
                    //         {
                    //             itemCards.map(({card: {info}}) => (
                    //                <h1>{info.name}</h1>   
                    //             ))
                    //         }
                    //     </div>
                    // }    
                    // </div>

                    // method-2
                    <MenuCard key={i} card={card} resInfo={resInfo}/>
                ))
                : 
                <h1 className='text-3xl font-semibold text-center my-10 '>Wait a while...</h1>
            }


            
        </div> 
        ) : (
        <MenuShimmer />
      )
      }  
    </div>
  )
}



export default RestaurantMenu




