import {Box, chakra, Divider, Flex, Image, useColorModeValue, Grid} from '@chakra-ui/react';
import placeholder from "../../img/sushi.jpg";
import {Button} from "@chakra-ui/button";
import {FaDollarSign, MdTitle} from "react-icons/all";
import {Spacer} from "@chakra-ui/layout";

const CFaDollarSign = chakra(FaDollarSign);

const DishCard = ({dish: {id, name, price, picture, description}}) =>
{
    return (
        <Flex
            w="full"
            alignItems="center"
            justifyContent="center"
            cursor={'pointer'}
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
                    alt="Picture of dish"
                    boxSize='350px'
                    roundedTop="lg"
                />

                <Box p="6">
                    <Divider mb={2}/>
                    <Box d="flex" alignItems="baseline">
                        {/* Aca irian las tags */}
                        {/* (
                            <Badge rounded="full" px="2" fontSize="0.7em" colorScheme="blue" mr={1}>
                                Tag
                            </Badge>
                        )*/}
                    </Box>
                    <div style={{maxWidth: '300px'}}>
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
                        <Flex mt="1" justifyContent="space-between" alignContent="center">
                            <Box
                                fontSize="md"
                                fontWeight="light"
                                as="p"
                                lineHeight="tight"
                            >
                                {description}
                            </Box>
                        </Flex>
                    </div>

                    <Flex>
                        <Box as="span" fontWeight="light" fontSize="2xl">${price}</Box>
                        <Spacer />
                        <Box>
                            <Button colorScheme="brand1" color='black'>+</Button>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default DishCard;

