import LayoutDefault from "../components/LayoutDefault";
import {useEffect, useState} from "react";
import {VStack} from '@chakra-ui/react'
import ApiRoutes from "../ApiRoutes";
import RestaurantCard from "../components/Restaurant/RestaurantCard";
import './Restaurants.css'

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        let getRestaurants = async () => {
            let response = await ApiRoutes.getRestaurants();
            return Object.values(response)
                .map((resto) => (
                    <RestaurantCard data={resto} key={resto.id}></RestaurantCard>
                ))
        }
        getRestaurants().then((restaurants) => setRestaurants(restaurants))
    }, [])

    return (
        <LayoutDefault>
            <div className={"restList"}>
                <VStack className={"restList"}>
                    {restaurants}
                </VStack>
            </div>
        </LayoutDefault>
    )
}

export default Restaurants
