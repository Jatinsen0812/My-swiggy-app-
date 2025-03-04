import { useContext, useEffect, useState } from "react";
import { coordinates } from "../context/context";


function useRestaurantData() {
  

  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [onYourMindData, setOnYourMind] = useState([]);
  const [topResTitle, setTopResTitle] = useState("")
  const [onlineTitle, setOnlineTitle] = useState("")
  const [searchData, setSearchData] = useState({});

  const {coordi: {lat, long}} = useContext(coordinates);
  // console.log(lat, long)
  

  async function fetchData() {
          let response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
          // let response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
           
          let result = await response.json();

          //  console.log(result);
         
          setSearchData(result.data)

    
        setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title);
        setOnlineTitle(result?.data?.cards[2]?.card?.card?.title);

        let mainData = result?.data?.cards.find(
            (data) => data?.card?.card?.id == "top_brands_for_you"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        let mainData2 = result?.data?.cards.find(
            (data) => data?.card?.card?.id == "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        setTopRestaurantData(mainData || mainData2);

        let data2 = result?.data?.cards.find(
            (data) => data?.card?.card?.id == "whats_on_your_mind"
        ).card?.card?.imageGridCards?.info;

        setOnYourMind(data2);
      }
      
          // console.log(data);
      
  useEffect(() => {
          fetchData();
  }, [lat, long]);


  return [topRestaurantData, onYourMindData, topResTitle, onlineTitle, searchData]

}

export default useRestaurantData