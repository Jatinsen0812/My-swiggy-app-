import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utility/cartSlice";
import toast from "react-hot-toast";


function AddToCartBtn({info, resInfo, handleNoIsDifRes}) {

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const getResInfoFromLocalStorage = useSelector((state) => state.cartSlice.resInfo)



    function handleAddToCart(){
        const isAdded = cartData.find((data) => data.id === info.id);

        if(!isAdded){
            if(getResInfoFromLocalStorage.name === resInfo.name || getResInfoFromLocalStorage.length === 0){
                dispatch(addToCart({info, resInfo}))
                toast.success("item added to cart");
            }
            else{
                handleNoIsDifRes()
            }
  
        }
        else{
            toast.error("already added")
        }
        
    }




  return (
    
      <button
        onClick={handleAddToCart}
        className="cursor-pointer hover:bg-gray-200 duration-300 absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-white border drop-shadow-xl border-gray-300 px-8 py-[6px] font-bold text-lg text-green-600 rounded-[11px] "
      >
        ADD
      </button>
    
  );
}

export default AddToCartBtn;
