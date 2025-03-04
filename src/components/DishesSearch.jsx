import { useDispatch, useSelector } from 'react-redux';
import { nonVeg, veg } from '../utility/links';
import AddToCartBtn from './AddToCartBtn';
import { setSimilarResDish, toggleIsDifRes, resetSimilarResDish } from '../utility/toggleSlice';
import { clearCartItem } from '../utility/cartSlice';
import { Link } from 'react-router-dom';


function DishesSearch({data}){

  let {
    info,
    restaurant: {info: resInfo},
    hideRestaurantDetails = false,
  } = data

  let { imageId = "", name, price, isVeg = 0, id : itemId} = info;
  let {id, name: resName, avgRating, sla: { slaString }, slugs : {city, restaurant : resLocation}} = resInfo;
  
  const {id: cartResId} = useSelector((state) => state.cartSlice.resInfo)


  const isDifRes = useSelector((state) => state.toggleSlice.isDifRes)
  const dispatch = useDispatch();

  function handleNoIsDifRes(){
        dispatch(toggleIsDifRes())
  }

  function handleYesIsDifRes(){
        dispatch(clearCartItem());
        handleNoIsDifRes()
  }

  function handleSameRes(){
    if(id === cartResId || !cartResId){
        // dispatch(resetSimilarResDish()) 
        dispatch(setSimilarResDish({
            isSimilarResDishes : true,
            city,
            resLocation,
            itemId,
            resId : id 
         }))
    }
  }



  return (
    <>
        <div className='bg-white rounded-2xl p-4 m-4'>
        {
          !hideRestaurantDetails && 
        <>
        {/* <Link to={`/restaurantMenu/${resLocation}-${id}`}> */}
        <Link to={`/restaurantMenu/${resLocation}-rest${id}`}>
          <div className='flex justify-between items-center text-sm'>
            <div >
                <p className='font-bold text-gray-600'>By {resName}</p>
                <div className='flex gap-2 text-gray-600 text-[13px] mt-1'>
                    <i className="fi fi-ss-star"></i>
                    <span>{avgRating}</span>
                    <span> . </span>
                    <span>{slaString}</span>
                </div>
            </div>
            <i className="text-2xl fi fi-rr-arrow-small-right"></i>
          </div>
        </Link>
          <hr className='my-3 border-dotted text-gray-400'/>
        </>

        }
        


        <div className='flex justify-between my-3 md:max-w-fit'>
            <div className='w-[60%] md:w-[188px] flex flex-col gap-1'>
                <div className='w-5'>
                    { 
                    isVeg ? <img src={veg} alt="" /> : <img src={nonVeg} alt="" />
                    }
                </div>
                <h1 className='text-md font-semibold line-clamp-1'>{name}</h1>
                <p className='text-base font-semibold'>₹{price/100}</p>
                <button className='border border-gray-300 rounded-2xl flex w-max p-[3px] px-2 text-[13px] font-[600] mt-3 text-gray-500'><span>More Details</span> <i className="mt-[3px] fi fi-rr-angle-small-right"></i></button>
            </div>
            <div className='w-[35%] md:w-[35%] relative h-full'>
                <img className='cursor-pointer object-cover rounded-xl aspect-square' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="" />
                {/* <button  className='cursor-pointer hover:bg-gray-200 duration-300 absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-white border drop-shadow-xl border-gray-300 px-8 py-[6px] font-bold text-lg text-green-600 rounded-[11px] '>ADD</button> */}
                <div onClick={handleSameRes}>
                   <AddToCartBtn info={info} resInfo={resInfo} handleNoIsDifRes={handleNoIsDifRes}/> 
                </div>
            </div>
            

        </div>
        </div>
      

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
    </>
  )
}

export default DishesSearch;