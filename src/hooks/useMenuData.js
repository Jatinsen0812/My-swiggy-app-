import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { coordinates } from "../context/context";

 
 function useMenuData() {
   
    const {id} = useParams();
//   console.log(id);
//   console.log(id.split("rest")[1]);

  let mainId = id.split("rest")[1];

  const [value, setValue] = useState(0);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [currIndex, setCurrIndex] = useState(null);
  const {coordi: {lat, long}} = useContext(coordinates);





  

  async function fetchMenu() {
    let response = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
    let result = await response.json();

    const resInfo = result?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("food.v2.Restaurant")
    )?.card?.card?.info;

  // console.log(resInfo);

    const discountInfo = result?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("v2.GridWidget")
    )?.card?.card?.gridElements?.infoWithStyle?.offers;

    setResInfo(resInfo);
    setDiscountData(discountInfo);


    
    let actualMenu = result?.data?.cards.find((data) => data?.groupedCard);

    setTopPicksData(
      (actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data.card.card.title == "Top Picks"
      )[0]
    );

    setMenuData(
        actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      )
    );
  }

  useEffect(() => {
    fetchMenu()
  }, [])


  return [value, setValue, setCurrIndex, resInfo, discountData, topPicksData, menuData, currIndex];

 }
 
 export default useMenuData