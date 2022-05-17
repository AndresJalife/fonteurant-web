import LayoutDefault from "../components/LayoutDefault";
import {useState} from "react";
import {Button, VStack} from '@chakra-ui/react'
import ApiRoutes from "../ApiRoutes";
import RestaurantCard from "../components/Restaurant/RestaurantCard";
import { useEffect } from "react";
import {useAuth} from "../components/AuthProvider";
import './Home.css'
import {NavLink} from "react-router-dom";

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const {user} = useAuth();

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
            <NavLink className={"createRest"} to={"/createRestaurant"}>
                <Button className={user ? "" : "hidden"} colorScheme="buttons" color="grey">{"Crear Restaurante"}</Button>
            </NavLink>
            <div className={"restList"}>
                <VStack className={"restList"}>
                    {restaurants}
                </VStack>
            </div>
        </LayoutDefault>
    )
}

export default Home