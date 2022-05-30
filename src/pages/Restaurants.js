import LayoutDefault from "../components/LayoutDefault";
import {useEffect, useState} from "react";
import {Heading, Input, InputGroup, InputLeftElement, InputRightElement, Wrap, WrapItem} from '@chakra-ui/react'
import ApiRoutes from "../ApiRoutes";
import RestaurantCard from "../components/Restaurant/RestaurantCard";
import {AiOutlineClose, AiOutlineSearch} from "react-icons/all";
import {Button} from "@chakra-ui/button";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantsFiltered, setRestaurantsFiltered] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        let getRestaurants = async () => {
            let response = await ApiRoutes.getRestaurants();
            return Object.values(response)
        }
        getRestaurants().then((restaurants) => {
            setSearch('')
            setRestaurants(restaurants)
            setRestaurantsFiltered(restaurants)
        })
    }, [])

    const searchRestaurant = (newValue) => {
        setSearch(newValue)
        setRestaurantsFiltered(restaurants.filter(restaurant => {
            return restaurant?.name?.toLowerCase().includes(newValue?.toLowerCase())
        }))
    }

    return (
        <LayoutDefault>
            <div style={{padding: '0 10%'}}>
                <Heading color="#565656" pt="110px">Restaurantes</Heading>
                <InputGroup maxWidth={500}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineSearch size={20} color='gray'/>}
                    />
                    {search && <InputRightElement maxWidth={500}>
                        <Button
                            color="gray"
                            bg="gray.200"
                            size='sm'
                            mr={1}
                            onClick={() => searchRestaurant('')}
                        >
                            <AiOutlineClose/>
                        </Button>
                    </InputRightElement>}
                    <Input
                        value={search}
                        onChange={e => searchRestaurant(e.target.value)}
                        placeholder='Buscar restaurante'
                    />
                </InputGroup>
                <Wrap spacing='25px' width="100%" py="20px">
                    {restaurantsFiltered.map((restaurant) => (
                        <WrapItem key={restaurant?.id}>
                            <RestaurantCard data={restaurant}/>
                        </WrapItem>
                    ))}
                </Wrap>
            </div>
        </LayoutDefault>
    )
}

export default Restaurants
