// not using keys (not acceptable) <<<<< index as key(last option if you dont have id) <<<<<<<<< unique id (best practice)
import RestaurantCard from "./RestaurantCard";
import resList from "../../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Body = () => {
  //Local state variable = super powerfull variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  //whenever  state variables update , react triggers a reconciliation cycle(re-render the component)

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchData(); //API call
  //   }, 1000); //1 sec delay
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const data = await fetch();

  //     if (!data.ok) {
  //       throw new Error("API failed");
  //     }
  //     const json = await data.json();
  //     console.log(json);
  //Optional chaining
  // const restaurants = json?.data?.cards?.find(
  //   (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
  // )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  // console.log(restaurants);

  // setListOfRestaurants(Array.isArray(restaurants) ? restaurants : []);

  // const filterRestaurants = json?.data?.cards?.find(
  //   (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
  // )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  // setFilteredRestaurants(
  //   Array.isArray(filterRestaurants) ? filterRestaurants : [],
  // );
  // setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  useEffect(() => {
    const restaurants =
      resList?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  }, []);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! please check you're internet connection.
      </h1>
    );
  //Conditional Rendering

  console.log("listOfRestaurants: ", listOfRestaurants);
  console.log("Mock Data: ", resList);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //Filter the restaurant cards and update the UI
              //searchText
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filteredRestaurant);
              console.log(searchText);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res && res.info.avgRating > 4,
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restaurant-container">
        {filteredRestaurants.map((restaurant) => {
          if (!restaurant?.info) return null;
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
