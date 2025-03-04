import { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utility/filterSlice';

function OnlineFoodDelivery({data, title}) {

    const filterOption = [
      {
        filterName: "Ratings 4.0+"
      },
      {
        filterName: "Offers"
      },
      {
        filterName: "Rs. 300-Rs. 600"
      },
      {
        filterName: "Less than Rs. 300"
      }
    ]

    const [activeBtn, setActiveBtn] = useState(null);

    function handleFilterBtn(filterName){
      setActiveBtn(activeBtn === filterName ? null : filterName) 
    }


    const dispatch = useDispatch();
    
    dispatch(setFilterValue(activeBtn))

  return (
    <div>
      <div className="flex flex-col justify-between mt-5">
        <h1 className="text-xl font-bold md:w-full line-clamp-1">{title}</h1>

        <div className='flex flex-wrap items-center gap-2 mt-4'>
          {
            filterOption.map((data, i) =>(
                <button key={i} onClick={() => handleFilterBtn(data.filterName)} className={'cursor-pointer flex items-center gap-1 shadow-2xl rounded-3xl px-3 py-[6px] font-medium text-[14px] text-gray-800/90 border border-gray-300 ' + (activeBtn === data.filterName ? "activecss" : "")}>
                  <p>{data.filterName}</p>
                  <i className="text-md mt-1 fi fi-rr-cross-small hidden"></i>
                  
                  
                </button>
            ))
          }
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 w-full duration-400 cursor-pointer">
            {data.map(({info, cta: {link}}, i) => (
               <div key={i} className='hover:scale-95 duration-300'>
                 <RestaurantCard {...info} link={link}/>
               </div>
            )
        )}
        </div>
      </div>
    </div>
  );
}

export default OnlineFoodDelivery