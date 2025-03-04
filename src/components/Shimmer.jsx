import React from 'react'

function Shimmer() {
  return (
    <div className='w-full'>
        <div className='w-full h-[350px] bg-slate-800 text-white flex flex-col gap-3 justify-center items-center'>
            <div className="relative flex items-start">
                <img
                    className="w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                    alt=""
                />
                <span className="loader "></span>
            </div>
            <h1 className='text-2xl'>Looking for great food near you...</h1>
        </div>
        <div className='w-[70%] mx-auto py-5 flex justify-between flex-wrap gap-5'>
            {
              Array(12).fill("").map((data, i) => (<div key={i} className='w-[275px] h-[185px]  rounded-md animate'></div>))
            }
            
        </div>
    </div>
  )
}

export default Shimmer;


export function MenuShimmer(){

    return (
        <div className='w-full lg:w-[50%] mx-auto mt-10'>
            <div className='w-full h-40 sm:h-80 animate'></div>
            <div className='w-full flex justify-between mt-10'>
                <div className='w-[45%] h-10 animate'></div>
                <div className='w-[45%] h-10 animate'></div>   
            </div>


            <div className="w-full mt-20 flex flex-col gap-9">
                {Array(5)
                    .fill("")
                    .map((data , i) => (
                        <div key={i} className="w-full h-40 flex justify-between">
                            <div className="w-[60%] flex flex-col gap-5 h-full">
                                <div className="w-[100%] h-5 animate"></div>
                                <div className="w-[50%] h-5 animate"></div>
                                <div className="w-[30%] h-5 animate"></div>
                            </div>
                            <div className="w-[30%] rounded-xl h-full animate"></div>
                        </div>
                    ))}
            </div>
        </div>  
    )
}


export function SearchShimmer(){


    return (
        <div className='w-full lg[850px] mx-auto mt-10'>
            <div className='w-full h-40 sm:h-80 animate'></div>
            <div className='w-full flex justify-between mt-10'>
                <div className='w-[45%] h-10 animate'></div>
                <div className='w-[45%] h-10 animate'></div>   
            </div>


            <div className="w-full mt-20 flex flex-col gap-9">
                {Array(5)
                    .fill("")
                    .map((data , i) => (
                        <div key={i} className="w-full h-40 flex justify-between">
                            <div className="w-[60%] flex flex-col gap-5 h-full">
                                <div className="w-[100%] h-5 animate"></div>
                                <div className="w-[50%] h-5 animate"></div>
                                <div className="w-[30%] h-5 animate"></div>
                            </div>
                            <div className="w-[30%] rounded-xl h-full animate"></div>
                        </div>
                    ))}
            </div>
        </div>
    )
}