import LayoutDefault from "../components/LayoutDefault";
import {useEffect, useState} from "react";
import {Heading, Wrap, WrapItem} from '@chakra-ui/react'
import ApiRoutes from "../ApiRoutes";
import RestaurantCard from "../components/Restaurant/RestaurantCard";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        let getRestaurants = async () => {
            let response = await ApiRoutes.getRestaurants();
            return Object.values(response)
                .map((resto) => (
                    <WrapItem key={resto.id}>
                        <RestaurantCard data={resto}></RestaurantCard>
                    </WrapItem>
                ))
        }
        getRestaurants().then((restaurants) => setRestaurants(restaurants))
    }, [restaurants])

    return (
        <LayoutDefault>
            <div style={{padding: '0 10%'}}>
                <Heading color="#565656" pt="110px">Restaurantes</Heading>
                <Wrap spacing='25px' width="100%" py="20px">
                    {restaurants}
                </Wrap>
            </div>
        </LayoutDefault>
    )
}

export default Restaurants
