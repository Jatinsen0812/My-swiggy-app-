
import React, { useEffect, useState } from 'react'

function OnYourMind({data}) {
  // const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  // console.log(data)

  // async function fetchData() {
  //   let response = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   let result = await response.json();

  //   console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  //   setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  // }

  //   // console.log(data);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }

  function handleNext() {
    value >= 134 ? "" : setValue((prev) => prev + 31);
  }


  return (
    <div >
      <div className="flex justify-between mt-5">
        <h1 className="text-xl font-bold">What's on your mind?</h1>
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

      <div style={{ translate: `-${value}%` }} className="flex duration-400">
        {data.map((item) => (
          <img
            key={item.id}
            className="w-36 cursor-pointer"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
            alt=""
          />
        ))}
      </div>

      <hr className='mt-12 text-gray-400/20 border-1' />
    </div>
  );
}

export default OnYourMind;
