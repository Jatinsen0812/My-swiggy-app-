import React, { useCallback, useContext } from 'react'
import { useState } from 'react';
import { cartContext } from '../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCartItem, } from '../utility/cartSlice';
import toast from 'react-hot-toast';
import AddToCartBtn from './AddToCartBtn';
import { toggleIsDifRes } from '../utility/toggleSlice';

let veg = "https://5.imimg.com/data5/SELLER/Default/2023/1/FC/HP/EV/74736417/plain-barcode-labels.jpeg";
let nonVeg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnsEk-9idzdD555Uxu5CVOoOxi6QDhUT44g&s";

function DetailMenuNext({info, resInfo}) {

    const {name,
        defaultPrice,
        price,
        itemAttribute,
        ratings: {aggregatedRating: {rating, ratingCountV2}},
        description="",
        imageId} = info;
    
    const [isMore, setIsMore] = useState(false)
    let trimDesc = description.substring(0, 130) + " ... ";

    // const {cartData, setCartData} = useContext(cartContext);
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const getResInfoFromLocalStorage = useSelector((state) => state.cartSlice.resInfo)
    // console.log(getResInfoFromLocalStorage)
    const dispatch = useDispatch();


    const isDifRes = useSelector((state) => state.toggleSlice.isDifRes)

    function handleNoIsDifRes(){
        dispatch(toggleIsDifRes())
    }

    function handleYesIsDifRes(){
        dispatch(clearCartItem());
        handleNoIsDifRes()
    }

    // no use now create comp
    // function handleAddToCart(){
    //     const isAdded = cartData.find((data) => data.id === info.id);
    //     // console.log(resInfo);

    //     // let getResInfoFromLocalStorage = JSON.parse(localStorage.getItem("resInfo")) || [];
    //     // console.log(getResInfoFromLocalStorage);

    //     if(!isAdded){
    //         if(getResInfoFromLocalStorage.name === resInfo.name || getResInfoFromLocalStorage.length === 0){
    //             dispatch(addToCart({info, resInfo}))
    //             toast.success("item added to cart");
    //         }
    //         else{
    //             // alert("different res item")
    //             // toast.error("different res item");
    //             handleNoIsDifRes()

    //         }
  
    //     }
    //     else{
    //         // alert("Already added")
    //         toast.error("already added")
    //     }
        
    //     // console.log(info)
    // }

    return (
        <div className='relative w-full'>
        <div className='flex justify-between w-full min-h-[182px]'>
            <div className='w-[50%] md:w-[70%]'>
                <img className='w-5' src={(itemAttribute && itemAttribute.vegClassifier === "VEG" ? veg : nonVeg)} alt="" />
                <h2 className='text-lg font-bold'>{name}</h2>
                <p className='font-semibold'>₹{defaultPrice/100 || price/100}</p>
                <div className='flex gap-1 items-center text-[13px] font-bold'>
                    <i className="text-green-800/90 mt-1 fi fi-ss-star"></i> 
                    <p className='text-green-900'>{rating}</p>
                    <p>({ratingCountV2})</p>
                </div>

                {
                    description.length > 130 ?
                    <div >
                       <span className='line-clamp-2 md:line-clamp-none'>{isMore ? description : trimDesc}</span>
                       <button onClick={() => setIsMore(!isMore)} className='hidden md:block cursor-pointer font-bold text-md text-gray-500'>{isMore ? "..less" : "more"}</button>
                    </div> : 
                    <span className=''>{description}</span>
                }
                
                
               
            </div>

            <div className='w-[40%] md:w-[20%] relative h-full'>
                <img className='cursor-pointer rounded-xl aspect-square' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="" />
                {/* <button onClick={handleAddToCart} className='cursor-pointer hover:bg-gray-200 duration-300 absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-white border drop-shadow-xl border-gray-300 px-10 py-[6px] font-bold text-lg text-green-600 rounded-[11px] '>ADD</button> */}
                <AddToCartBtn info={info} resInfo={resInfo} handleNoIsDifRes={handleNoIsDifRes}/>
            </div>
            
            {/* <div>{console.log(info)}</div> */}
        </div>

        <hr className='my-5 text-gray-300'/>


        {
            isDifRes && (
                <div className='p-7 w-[520px] h-[204px] z-50 bg-white border border-gray-400 shadow-4xl fixed bottom-10 left-[370px]'>
                    <h1 className='text-xl font-bold'>Items already in cart</h1>
                    <p className='mt-1 text-sm font-medium text-gray-600'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                    <div className='flex justify-between w-full mt-5'>
                        <button onClick={handleNoIsDifRes} className='cursor-pointer hover:shadow-lg w-[47%] bg-white border-2 text-[#1ba672] text-[15px] font-bold border-[#1ba672] py-3'>NO</button>
                        <button onClick={handleYesIsDifRes} className='cursor-pointer hover:shadow-lg w-[47%] bg-[#1ba672] text-white text-[15px] font-bold py-3'>YES, START AFRESH</button>
                    </div> 
                </div>
            )
        }
        </div>

    )
}

export default DetailMenuNext