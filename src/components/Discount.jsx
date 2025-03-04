import React from 'react'

function Discount({info}) {

    // console.log(info)


  return (
    <div className="flex cursor-pointer min-w-[328px] h-[76px] p-3 border border-gray-300 justify-start items-center gap-3 rounded-2xl">
      <div className="w-12">
        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${info.offerLogo}`} alt=""/>
      </div>
      <div className="flex flex-col">
        <p className='font-extrabold'>{info?.header}</p>
        <p className='text-[13px] font-bold text-gray-500/80'>{info?.primaryDescription}</p>
      </div>
    </div>
  );
}

export default Discount