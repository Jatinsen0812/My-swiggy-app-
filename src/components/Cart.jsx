import React, { useContext, useState, useEffect } from 'react'
import { cartContext } from '../context/context'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, clearCartItem } from '../utility/cartSlice';
import toast from 'react-hot-toast';
import { toggleLogin } from '../utility/toggleSlice';

let veg = "https://5.imimg.com/data5/SELLER/Default/2023/1/FC/HP/EV/74736417/plain-barcode-labels.jpeg";
let nonVeg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnsEk-9idzdD555Uxu5CVOoOxi6QDhUT44g&s";

function Cart() {

    
    const navigate = useNavigate();

    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const resInfo = useSelector((state) => state.cartSlice.resInfo);
    // console.log(resInfo)

    const dispatch = useDispatch();


    const userData = useSelector((state) => state.authSlice.userData)

    let Total = 0;
    for(let i=0; i<cartData.length; i++){
        Total += cartData[i].defaultPrice/100 || cartData[i].price/100;        
    }

    // let Total = cartData.reduce((acc, currVal) => acc + currVal.defaultPrice/100 || currVal.price/100, 0)


    function handleRemoveBtn(i){

        if(cartData.length > 1){
            let newArr = [...cartData];

            newArr.splice(i, 1);
            // setCartData(newArr);
            dispatch(deleteItem(newArr))
            toast.success("item removed")
        }
        else{
            handleClearCart();
            
        }        
    }

    
    function handleClearCart(){
        dispatch(clearCartItem());
        toast.success("cart is cleared")
        // setCartData([]);
        // localStorage.setItem("cartData" , JSON.stringify([]));
        // or
        // localStorage.clear();
        
    }

    function handlePlaceOrder(){
        if(!userData){
            toast.error("login first")
            // navigate("/signin");
            dispatch(toggleLogin())
            return
        }

        toast.success("order placed")
    }

    




    if(cartData.length === 0){
        return (
        <div className='w-full'>
           <div className='w-[50%] mx-auto flex flex-col items-center pt-5 gap-1'>
             <img className='w-76' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
             <div className='flex flex-col gap-1 justify-center items-center mt-3'>
                <h1 className='text-xl font-bold text-gray-800/90'>Your cart is empty</h1>
                <h2 className='text-lg font-semibold text-gray-800/90'>Order Something</h2>
                <p className='text-md font-semibold text-gray-600 text-center'>You can go to home page to view more restaurants</p>   
             </div>
             
             
             <Link to={"/"}>
                <button className='mt-3 cursor-pointer hover:shadow-2xl  bg-[#ff5200] border drop-shadow-xl border-gray-300 px-5 py-[8px] font-bold text-[15px] text-white'>SEE RESTAURANTS NEAR YOU</button>
             </Link>
           </div>
        </div>
        )
    }

  return (
    
    <div className='w-full'>
        <div className='w-[95%] md:w-[800px] mx-auto'>
            <Link to={`/restaurantMenu/${resInfo.id}`}>
            <div className='flex  gap-6 my-8'>
               <img className='rounded-xl aspect-square w-35' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + resInfo?.cloudinaryImageId} alt="" />
               <div>
                   <p className='text-3xl font-semibold text-black'>{resInfo.name}</p>
                   <p className='text-xl font-medium text-gray-600 mt-1'>{resInfo.areaName} ({resInfo.city})</p>
               </div>   
            </div>
            </Link>
            <hr className='mb-8 border-2 border-gray-400/40'/>


            <div>
                <h1 className='text-3xl text-gray-600 mb-7 font-bold'>Cart-Items:</h1>
            {
            cartData.map(({name,
                defaultPrice,
                price,
                itemAttribute,
                ratings: {aggregatedRating: {rating, ratingCountV2}},
                description="",
                imageId}, i) => {

                    // const [isMore, setIsMore] = useState(false)
                    // let trimDesc = description.substring(0, 130) + " ... ";
                    
                    return (
                <div key={i}>
                <div  className='flex justify-between w-full min-h-[182px]'>
                   <div className='w-[55%] md:w-[70%]'>
                      <img className='w-5' src={(itemAttribute && itemAttribute.vegClassifier === "VEG" ? veg : nonVeg)} alt="" />
                      <h2 className='text-lg font-bold'>{name}</h2>
                      <p className='font-semibold'>₹{defaultPrice/100 || price/100}</p>
                      <div className='flex gap-1 items-center text-[13px] font-bold'>
                         <i className="text-green-800/90 mt-1 fi fi-ss-star"></i> 
                         <p className='text-green-900'>{rating}</p>
                         <p>({ratingCountV2})</p>
                      </div>


                      <div className='line-clamp-2'>{description}</div>

                      {/* {
                        description.length > 130 ?
                        <div >
                           <span className=''>{isMore ? description : trimDesc}</span>
                           <button onClick={() => setIsMore(!isMore)} className='cursor-pointer font-bold text-md text-gray-500'>{isMore ? "..less" : "more"}</button>
                        </div> : 
                        <span className=''>{description}</span>
                      } */}
                
                
               
                   </div>

                <div className='w-[40%] md:w-[20%] relative h-full'>
                   <img className='cursor-pointer rounded-xl aspect-square' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="" />
                   {/* <button onClick={handleRemoveBtn} className='cursor-pointer hover:bg-gray-200 duration-300 absolute top-33 left-[16px] bg-white border drop-shadow-xl border-gray-300 px-10 py-[6px] font-bold text-lg text-green-600 rounded-[11px] '>Remove</button> */}
                   
                    <button onClick={() => handleRemoveBtn(i)} className='cursor-pointer  absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-red-500 border drop-shadow-xl border-gray-300 px-4 py-[4px] font-bold text-lg text-white rounded-[11px] '>Remove</button>

                
                </div>
            
              </div>

              <hr className='my-5 text-gray-300'/>
        </div>
            )})}
            </div>

          <div className='flex flex-col justify-center items-center '>
   
            <h1 className='mt-10 text-2xl font-semibold text-gray-700'>Amount - <span className='font-bold'>₹{Total}</span></h1>
            <div className='flex gap-3 my-6'>
               <button onClick={handlePlaceOrder} className='mt-2 cursor-pointer bg-green-600 border drop-shadow-xl border-gray-300 px-10 py-[6px] font-bold text-lg text-white rounded-[11px] '>Place Order</button>

               <button onClick={handleClearCart} className='mt-2 cursor-pointer bg-green-600 border drop-shadow-xl border-gray-300 px-10 py-[6px] font-bold text-lg text-white rounded-[11px] '>Clear Cart</button>
            </div>
          </div>
           
        </div>
    </div>
  )
}

export default Cart