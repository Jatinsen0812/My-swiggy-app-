import React, { useContext, useEffect, useState } from 'react'
import DishesSearch from './DishesSearch';
import SearchRes, { withHoc } from './SearchRes';
import { coordinates } from '../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { resetSimilarResDish } from '../utility/toggleSlice';
import { MenuShimmer, SearchShimmer } from './Shimmer';

function Search() {

    const [searchQuery, setSearchQuery] = useState("");
    const [dishes, setDishes] = useState([]);
    const [restaurantsData, setRestaurantsData] = useState([]);
    const {coordi: {lat, long}} = useContext(coordinates);
    const {isSimilarResDishes, city, resId, itemId, resLocation } = useSelector((state) => state.toggleSlice.similarResDish);
    // console.log(resId);
    const dispatch = useDispatch()
    const [selectedResDishes, setSelectedResDishes] = useState(null);
    const [similarResDishes, setSimilarResDishes] = useState([]);
    const [loading, setLoading] = useState(false);

    const PromotedRes = withHoc(SearchRes);
    
    

    const filterOption = [
          {
            filterName: "Restaurants"
          },
          {
            filterName: "Dishes"
          },
    ]

     
    async function fetchSimilarResDishes() {


        let pathname = `/city/${city}/${resLocation}`;
        let encodedPath = encodeURIComponent(pathname);


        let response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)
        let result = await response.json();

        // console.log("res", result)
        // console.log(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)

        // console.log(result?.data?.cards[1])
        // console.log(result?.data?.cards[2]?.card?.card?.cards)

        setSelectedResDishes(result?.data?.cards[1])
        setSimilarResDishes(result?.data?.cards[2]?.card?.card?.cards)

        dispatch(resetSimilarResDish())
    }

    useEffect(() => {
        if(isSimilarResDishes){
            fetchSimilarResDishes()
        }
    }, [isSimilarResDishes])
    

    async function fetchDishesData() {
        setLoading(true); 
        let response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchQuery}&trackingId=a76539dc-f297-ff27-c4e9-7d4c675b6b67&submitAction=ENTER&queryUniqueId=8f97261a-529f-6b68-8e5a-440202bbf32e`)
        let result = await response.json();

        const finalData = (result?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data) => data?.card?.card?.info)

        setDishes(finalData);
        setLoading(false); 
        // console.log(dishes)
    }

    async function fetchRestaurantsData() {
        setLoading(true); 
        let response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=5b39ac71-976f-39da-4159-5170a65bf4f7&selectedPLTab=RESTAURANT`)
        let result = await response.json();

        const finalData = (result?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data) => data?.card?.card?.info)

        setRestaurantsData(finalData)
        setLoading(false); 
        // console.log(restaurantsData)
    }

    useEffect(() => {
        if(searchQuery === ""){
            return 
        }
        fetchDishesData();
        // setSearchQuery("")
        fetchRestaurantsData();
    }, [searchQuery])
    
    const [activeBtn, setActiveBtn] = useState("Dishes");
    
    function handleFilterBtn(filterName){
          setActiveBtn(activeBtn === filterName ? activeBtn : filterName) 
    }

    function handleSearchQuery(e){
        let val = e.target.value;
        if(e.keyCode == 13){
            setSearchQuery(val)
            setSelectedResDishes(null)
            setDishes([])
        }

    }

    


  return (
    <div className='w-full mt-10 md:w-[850px] mx-auto'>
      <div className='w-full'>
        <div className='w-full relative text-[#757575]'>
            <i className="mt-[3px] text-lg font-bold top-1/2 -translate-y-1/2 ml-4 absolute fi fi-bs-angle-left"></i>
            <i className="mt-[2px] top-1/2 -translate-y-1/2 right-0 mr-5 absolute fi fi-bs-search"></i>
            
            <input
              onKeyDown={handleSearchQuery}
          //   onChange={(e) => setSearchQuery(e.target.value)}
              className='rounded-sm text-black font-semibold w-full py-3 pr-40 pl-12 focus:outline-none border border-gray-300' type="text" placeholder='Search for restaurants and food' 
            />
        </div>
        
            
       
        { !selectedResDishes && 
            <div className='flex flex-wrap items-center gap-2 mt-4'>
          {
            filterOption.map((data, i) =>(
                <button key={i} onClick={() => handleFilterBtn(data.filterName)} className={' cursor-pointer flex items-center gap-1 shadow-2xl rounded-3xl px-3 py-[6px] font-bold text-[14px]  border border-gray-300 ' + (activeBtn === data.filterName ? "activecss" : "")}>
                  <p>{data.filterName}</p>                  
                </button>
            ))
          }
            </div>  
        }
       </div>


     
       {loading ? (
                <SearchShimmer />
            ) : (

        <div className='w-full md:w-[850px] mt-5 bg-[#f5f6f8] grid grid-cols-1 md:grid-cols-2'>
            { 
                selectedResDishes ? 
                <>
                <div>
                  <p className='font-bold text-gray-600 p-4'>Item added to cart</p>
                  <DishesSearch data={selectedResDishes.card.card}/>
                  <p className='font-semibold text-lg text-gray-600 p-4'>More dishes from this restaurant</p>
                </div>
                  <br />
                  {
                    similarResDishes.map((data, i) => (
                        <DishesSearch key={i} data={{...data.card, restaurant: selectedResDishes.card.card.restaurant}}/>
                    ))
                  }
                </>

                :

                //dishes section

                activeBtn === "Dishes" ? 
                dishes.map((data, i) => (
                    <DishesSearch key={i} data={data.card.card}/>
                ))
                :
                (restaurantsData.map((data, i) =>
                  data?.card?.card?.info?.promoted ? (
                      <PromotedRes data={data} key={i} />
                  ) : (
                      <SearchRes data={data}  key={i}/>
                  )
                ))    
              }
        </div>)


      } 
      
    </div>
  )
}

export default Search;

