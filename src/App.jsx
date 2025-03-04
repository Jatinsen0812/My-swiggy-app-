// import Head from "./components/Head"
// import Body from "./components/Body"
import { Routes, Route } from "react-router-dom"
// import RestaurantMenu from "./components/RestaurantMenu"
import { lazy, Suspense, useEffect, useState } from "react";
// import { visibility } from "./context/context";
import { coordinates } from "./context/context";
import { cartContext } from "./context/context";
// import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import SignInPage from "./components/SignInBtn";
import Shimmer from "./components/Shimmer";
// import Search from "./components/Search";


const Head = lazy(() => import("./components/Head"));
const Body = lazy(() => import("./components/Body"));
const Search = lazy(() => import("./components/Search"));
const Cart = lazy(() => import("./components/Cart"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));


function App() {

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);


  // const [visible, setVisible] = useState(false);
  const [coordi, setCoordi] = useState({lat: 23.2642598, long: 77.412038})
  




  // function get_Data_From_Local_Storage(){
  //   let data = JSON.parse(localStorage.getItem("cartData")) || []
  //   setCartData(data)
  // }

  // useEffect(() => {
  //   get_Data_From_Local_Storage();
  // }, [])
  
  return ( 
      <coordinates.Provider value={{ coordi, setCoordi }}>
        {/* <visibility.Provider value={{ visible, setVisible }}> */}
          <div className={" " + (visible || loginVisible ? "max-h-screen  overflow-x-hidden overflow-hidden" : "")}>
            <Suspense
            //  fallback={<Shimmer/>}
             >
             <Routes>
              <Route path="/" element={<Head />}>
                <Route path="/" element={<Body />} />
                <Route path="/restaurantMenu/:id"element={<RestaurantMenu />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/search" element={<Search />}/>
                {/* <Route path="/signin" element={<SignInPage />}/> */}
                <Route path="*" element={<h1>comming soon....</h1>}/>
              </Route>
             </Routes>
            </Suspense>
          </div>
        {/* </visibility.Provider> */}
      </coordinates.Provider>
  );
}

export default App;
