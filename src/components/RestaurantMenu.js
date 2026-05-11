import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
 import useResturantMenu from "../../utils/useRestaurantMenu";

const RestaurantMenu = () => {

  const { resId } = useParams();
  const resInfo = useResturantMenu(resId);
  // const cleanResId = resId?.replace(/[^0-9]/g, "");

  if (resInfo === null) return <Shimmer />;
  // const {name, cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info || {};

  // const  itemCards  = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;
  const itemCards =
    resInfo?.cards
      ?.find((c) => c?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
        (c) => c?.card?.card?.itemCards,
      )?.card?.card?.itemCards || [];


  console.log(itemCards);
  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines?.join(",")} - {costForTwoMessage}
      </p>

      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - {"Rs."}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
        
      </ul>
    </div>
  );
};
export default RestaurantMenu;
