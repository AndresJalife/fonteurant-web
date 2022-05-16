import LayoutDefault from "../components/LayoutDefault";
import {useState} from "react";
import { VStack } from '@chakra-ui/react'
import ApiRoutes from "../ApiRoutes";
import RestaurantCard from "../components/Restaurant/RestaurantCard";
import { useEffect } from "react";

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
  let getRestaurants = async () => {
      let response = await ApiRoutes.getRestaurants();
      let restaurants = []
      Object.values(response).forEach((resto) => {
          restaurants.push(<RestaurantCard data={resto} key={resto.id}></RestaurantCard>)
      })
      setRestaurants(restaurants)
  }

  useEffect(() => {
      getRestaurants()
  }, [])

  return (
    <LayoutDefault>
        <VStack className={"restList"}>
            {restaurants}
        </VStack>
    </LayoutDefault>
  )
}

export default Home