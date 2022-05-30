import './RestaurantCard.css'
import {useNavigate} from "react-router";
import {Badge, Box, Center, chakra, Divider, Flex, Image, Tooltip, useColorModeValue} from '@chakra-ui/react';
import placeholder from "../../img/placeholder_restaurant.jpg";
import {GrLocation} from "react-icons/all";
import Tag from "../Tag";

const CGrLocation = chakra(GrLocation)

const RestaurantCard = (
    {
        data: {
            id,
            owner_id,
            name,
            address,
            cbu,
            wallet_address,
            schedule,
            location_scope,
            tags,
            picture
        }
    }
) => {
    let navigate = useNavigate();

    // const [viewTags, setViewTags] = useState([]);

    const goToRestaurant = () => {
        navigate(`/restaurant/${id}`)
    }

    // useEffect(() => {
    //     let aux = []
    //     for(let tag in tags){
    //         aux.push(<Tag value={tags[tag]}/>)
    //     }
    //     setViewTags(aux)
    // }, [tags])

    return (
        <Flex
            w="full"
            alignItems="center"
            justifyContent="center"
            cursor={'pointer'}
            onClick={goToRestaurant}
        >
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
            >

                <Image
                    src={picture || placeholder}
                    fallbackSrc={placeholder}
                    alt="Picture of restaurant"
                    boxSize='350px'
                    roundedTop="lg"
                />

                <Box p="6" pt="0">
                    <Divider mb={2}/>
                    <Box d="flex" alignItems="baseline">
                        {cbu && ( <Tag value={"Tarjetas"} color={"blue"}/>)}
                        {wallet_address && (<Tag value={"Criptomonedas"} color={"blue"}/>)}
                        {/*{viewTags}*/}
                        {tags && tags.length > 0 && (<Tooltip
                            label={tags}
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1em'}
                        ><Tag value={"..."}/></Tooltip>)}
                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                        >
                            {name}
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Box fontSize="2xl">
                            <Box as="span" color={'gray.600'} fontSize="lg">
                                <Center>
                                    <CGrLocation color="gray" mr={1}/>
                                    {address}
                                    <Badge rounded="sm" px="2" fontSize="0.6em" colorScheme="gray" ml={1}>
                                        {location_scope} km
                                    </Badge>
                                </Center>

                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default RestaurantCard;

