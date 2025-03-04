// shortcut: rfce
// CORS Proxy: Moesif Origin

import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { coordinates, visibility,cartContext } from '../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogin, toggleSearchBar } from '../utility/toggleSlice';
import SignInBtn from './SignInBtn';





function Head() {

  const navItems = [
    // {
    //   name: "Swiggy Corporate",
    //   image: <i className="mt-2 fi fi-br-shopping-bag"></i>,
    //   path: "/corporate"
    // },
    {
      name: "Search",
      image: <i className="mt-2 fi fi-bs-search"></i>,
      path: "/search"
    },
    // {
    //   name: "Offers",
    //   image: <i className="mt-2 fi fi-bs-badge-percent"></i>,
    //   path: "/offers"
    // },
    // {
    //   name: "Help",
    //   image: <i className="mt-2 fi fi-sr-life-ring"></i>,
    //   path: "/help"
    // },
    {
      name: "Sign In",
      image: <i className="mt-2 fi fi-bs-user"></i>,
      path: "/signin"
    },
    {
      name: "Cart",
      image: <i className="mt-2 fi fi-bs-shopping-cart"></i>,
      path: "/cart"
    },
  ]


  // constext api
  // const {visible, setVisible} = useContext(visibility);

  // redux-store data using useSelector hook
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);


  const dispatch = useDispatch();
  // console.log(visible);

  const {setCoordi} = useContext(coordinates);
  // const {cartData, setCartData} = useContext(cartContext);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  // console.log(cartData)

  const userData = useSelector((state) => state.authSlice.userData)

  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState([]);

  

  function handlevisibility(){
    // setVisible((prev) => !prev);
    dispatch(toggleSearchBar());
  }

  function handleLogin(){
    dispatch(toggleLogin());
  }

  async function searchResultFunc(val) {
    if(val == ""){
      return;
    }
    let response = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`);
    let result = await response.json();

    setSearchResult(result.data)
    // console.log(val);
    
  }


  async function fetchLatAndLong(id) {
    if(id == ""){
      return;
    }

    handlevisibility();

    // console.log(id);
    let response = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`);
    let result = await response.json();

    setCoordi({
      lat: result.data[0].geometry.location.lat,
      long: result.data[0].geometry.location.lng
    })
    
    // console.log(result.data[0].geometry.location.lng);
    // console.log(result.data[0].formatted_address);

    setAddress(result.data[0].formatted_address);
    
  }

  


  return (
    <>
     <div className='w-full'>
        <div onClick={handlevisibility} className={'w-full h-full bg-black/50 absolute z-30 ' + (visible ? "visible" : "invisible")}> </div>
        <div className={'flex justify-center w-full md:w-[35%] h-full bg-white p-5 z-40 absolute duration-500 ' + (visible ? "left-0" : "-left-[100%]")}>
            <div className='w-[80%] flex flex-col gap-2 '>
                <i onClick={handlevisibility} className="cursor-pointer text-2xl fi fi-rr-cross-small"></i>
                <div className='w-full'>
                  <input type="text" placeholder='Search for area...' className='w-full py-3 pl-2 font-semibold border border-gray-400  focus:outline-none focus:shadow-2xl' onChange={(e) => searchResultFunc(e.target.value)} />
                </div>

                {
                  searchResult.length ? 
                  <div className='border border-gray-400'>
                   <ul>
                     {
                      searchResult.map((data, i) => {
                        const isLast = (i === searchResult.length-1)

                        return(
                        
                          <div key={i} className='my-2 px-5 flex  justify-start gap-2'>
                            <i className="mt-1 text-xl fi fi-rs-marker"></i>
                            <li onClick={() => fetchLatAndLong(data.place_id)} key={i} className='cursor-pointer font-semibold'>{data?.structured_formatting?.main_text} <p className='text-sm opacity-65'>{data?.structured_formatting?.secondary_text}</p>
                            {!isLast && <p className='opacity-55'>---------------------------------------</p>}
                            </li>
                          </div>
                        
                      )})
                     }
                   </ul>
   
                </div>
                :
                ""
                }
                
            
                
            </div>
        </div>
     </div>

     <div className='w-full h-full'>
        <div onClick={handleLogin} className={'w-full h-full bg-black/50 absolute z-30 ' + (loginVisible ? "visible" : "invisible")}> </div>
        <div className={'flex justify-center w-full md:w-[30%] h-full bg-white py-5 z-40 fixed duration-500 ' + (loginVisible ? "right-0" : "-right-[100%]")}>
            <div className='w-[80%] flex flex-col  '>
                <i onClick={handleLogin} className="cursor-pointer text-2xl fi fi-rr-cross-small"></i>

                <div className='w-full flex justify-between items-center my-5'>
                  <h2 className='text-4xl font-semibold'>Login</h2>
                  <img className='w-23' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                </div>

                <SignInBtn />
                <p className='mt-2 w-full text-[13px] font-semibold text-gray-600'>By clicking on Login, I accept the <span className='text-black'>Terms & Conditions</span> & <span className='text-black'>Privacy Policy</span></p>
            
                
            </div>
        </div>
      </div>

     <div className='relative w-full h-full'>
      <div className="w-full sticky bg-white z-20 top-0 h-20 shadow-md flex justify-center items-center ">
      <div className="flex items-center justify-between w-full md:w-[85%]">
        <div className="flex items-center cursor-pointer">
          <Link to={"/"}>
            <div className="w-20">
             <img src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt=""/>
            </div>
          </Link>
          
          <div className=" max-w-60 flex items-center cursor-pointer" onClick={handlevisibility}>
            <p className='flex items-center'>
              <span className='text-sm font-bold border-b-2 '>Other</span>
              <span className=' ml-2 text-gray-500 font-medium line-clamp-1'>{address}</span>
            </p>
            <i className="text-orange-500 text-2xl mt-2 fi fi-rs-angle-small-down"></i>
          </div>
        </div>

        <div className="hidden md:flex items-center  gap-6 md:gap-10">
          
          {navItems.map((data, i) => (

            data.name === "Sign In" ? 

          <div onClick={handleLogin} key={data.path}>
            <div className="flex items-center gap-2 hover:text-orange-600 cursor-pointer" key={i}>
              {
                userData ? 
                  <img className='rounded-full w-12' src={userData.photo} alt="" />
                   :
                  <p className='mt-2'>{data.image}</p>
              }
              <p className='font-semibold'>{userData ? userData.name : data.name}</p>

              {data.name === "Cart" && cartData.length > 0 ? <p className='font-semibold'>({cartData.length})</p> : ""}
            </div>
          </div>  
            
            :
                 
          <Link to={data.path} key={data.path}>
            <div className="flex items-center gap-2 hover:text-orange-600 cursor-pointer" key={i}>  
              <p className='mt-2'>{data.image}</p>
              <p className='font-semibold'>{data.name}</p>

              {data.name === "Cart" && cartData.length > 0 ? <p className='font-semibold'>({cartData.length})</p> : ""}
            </div>
          </Link>
          ))}
        </div>

        <div className='md:hidden flex items-center gap-6 mr-6 '>
           {navItems.map((data, i) => (

             data.name === "Sign In" ?

             <div key={data.path} className='flex items-center gap-2 hover:text-orange-600 cursor-pointer' onClick={handleLogin}>
              <p className='mt-2'>{data.image}</p>
              </div>
             
             :
             <Link to={data.path} key={data.path}>
              <div className='flex items-center gap-2 hover:text-orange-600 cursor-pointer'>
                <p className='mt-2'>{data.image}</p>
                {data.name === "Cart" && cartData.length > 0 ? <p className='font-semibold'>({cartData.length})</p> : ""}
              </div>
             </Link>
           ))}
        </div>
      </div>
      </div>

      <Outlet />
     </div>

     
    </>


  );
}

export default Head;