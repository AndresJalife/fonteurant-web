import LayoutDefault from "../components/LayoutDefault";
import {useEffect, useState} from "react";
import {Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Wrap, WrapItem} from '@chakra-ui/react'
import ApiRoutes from "../ApiRoutes";
import RestaurantCard from "../components/Restaurant/RestaurantCard";
import {AiOutlineClose, AiOutlineSearch} from "react-icons/all";
import {Button} from "@chakra-ui/button";
import {Select} from "chakra-react-select";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantsFiltered, setRestaurantsFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const tags = restaurants.flatMap(r => r?.tags).map(t => ({value: t, label: t}))

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

    const filterRestaurants = (newSearch, newTags) => {
        setSearch(newSearch)
        setSelectedTags(newTags)
        setRestaurantsFiltered(restaurants.filter(restaurant => {
            const matchByName = restaurant?.name?.toLowerCase().includes(newSearch?.toLowerCase())
            const matchByTags = newTags.every(tag => restaurant?.tags.includes(tag?.value))
            return matchByName && matchByTags
        }))
    }

    return (
        <LayoutDefault>
            <div style={{padding: '0 10%'}}>
                <Heading color="#565656" pt="95px" mb={5}>Restaurantes</Heading>
                <Stack direction="horizontal">
                    <div style={{width: '500px'}}>
                        <Select
                            isMulti
                            placeholder="Tags"
                            name="Tags"
                            options={tags}
                            className="basic-multi-select"
                            classNamePrefix="Tags"
                            closeMenuOnSelect={false}
                            onChange={tags => filterRestaurants(search, tags)}
                        />
                    </div>
                    <InputGroup maxWidth={500} ml={5}>
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
                                onClick={() => filterRestaurants('', selectedTags)}
                            >
                                <AiOutlineClose/>
                            </Button>
                        </InputRightElement>}
                        <Input
                            value={search}
                            onChange={e => filterRestaurants(e.target.value, selectedTags)}
                            placeholder='Buscar restaurante'
                        />
                    </InputGroup>
                </Stack>
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
