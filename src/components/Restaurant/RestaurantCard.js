import './RestaurantCard.css'
import {useNavigate} from "react-router";
import {Badge, Box, Center, chakra, Divider, Flex, Image, useColorModeValue} from '@chakra-ui/react';
import placeholder from "../../img/placeholder_restaurant.jpg";
import {GrLocation} from "react-icons/all";

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
            picture
        }
    }
) => {
    let navigate = useNavigate();

    const goToRestaurant = () => {
        navigate(`/restaurant/${id}`)
    }

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
                    alt="Picture of restaurant"
                    boxSize='350px'
                    roundedTop="lg"
                />

                <Box p="6">
                    <Divider mb={2}/>
                    <Box d="flex" alignItems="baseline">
                        {cbu && (
                            <Badge rounded="full" px="2" fontSize="0.7em" colorScheme="blue" mr={1}>
                                Tarjetas
                            </Badge>
                        )}
                        {wallet_address && (
                            <Badge rounded="full" px="2" fontSize="0.7em" colorScheme="pink">
                                Criptomonedas
                            </Badge>
                        )}
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

