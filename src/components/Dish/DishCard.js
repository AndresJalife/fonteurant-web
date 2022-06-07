import {Box, chakra, Divider, Flex, Image, Text, Tooltip, useColorModeValue} from '@chakra-ui/react';
import placeholder from "../../img/sushi.jpg";
import {Button} from "@chakra-ui/button";
import {Spacer} from "@chakra-ui/layout";
import {AiFillDelete, AiFillEdit, AiOutlinePlus} from "react-icons/all";

const CAiOutlinePlus = chakra(AiOutlinePlus)
const CAiFillEdit = chakra(AiFillEdit)
const CAiFillDelete = chakra(AiFillDelete)

const DishCard = ({dish, isOwner, onEdit, onDelete, onAdd}) => {
    const {id, name, price, picture, description, } = dish;

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
                    fallbackSrc={placeholder}
                    alt="Picture of dish"
                    boxSize='350px'
                    roundedTop="lg"
                />

                <Box p="6" pt="0">
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
                                height='40px'
                            >
                                <Tooltip
                                    label={name}
                                    bg="white"
                                    placement={'top'}
                                    color={'gray.800'}
                                    fontSize={'1em'}
                                >
                                    <Text noOfLines={1}>
                                        {name}
                                    </Text>
                                </Tooltip>
                            </Box>
                        </Flex>
                        <Flex mt="1" justifyContent="space-between" alignContent="center">
                            <Box
                                fontSize="md"
                                fontWeight="light"
                                as="p"
                                lineHeight="tight"
                                height='62px'
                            >
                                <Tooltip
                                    label={description}
                                    bg="white"
                                    placement={'top'}
                                    color={'gray.800'}
                                    fontSize={'1em'}
                                >
                                    <Text color='gray.500' noOfLines={2} style={{textAlign: 'left'}}>
                                        {description}
                                    </Text>
                                </Tooltip>
                            </Box>
                        </Flex>
                    </div>

                    <Flex>
                        <Box as="span" fontWeight="light" fontSize="2xl">${price}</Box>
                        <Spacer/>
                        <Box>
                            {isOwner ? (
                                <>
                                    <Tooltip
                                        label="Editar plato"
                                        bg="white"
                                        placement={'top'}
                                        color={'gray.800'}
                                        fontSize={'1em'}
                                    >
                                        <Button
                                            colorScheme="brand1"
                                            color='black'
                                            mr={1}
                                            onClick={() => onEdit(dish)}
                                        >
                                            <CAiFillEdit color="black"/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        label="Eliminar plato"
                                        bg="white"
                                        placement={'top'}
                                        color={'gray.800'}
                                        fontSize={'1em'}
                                    >
                                        <Button
                                            colorScheme="brand1"
                                            color='black'
                                            onClick={() => onDelete(id)}
                                        >
                                            <CAiFillDelete color="black"/>
                                        </Button>
                                    </Tooltip>
                                </>
                            ) : (
                                <Tooltip
                                    label="Agregar al pedido"
                                    bg="white"
                                    placement={'top'}
                                    color={'gray.800'}
                                    fontSize={'1em'}
                                >
                                    <Button
                                        colorScheme="brand1"
                                        color='black'
                                        onClick={() => onAdd(dish)}
                                        _hover={{
                                            bg: 'brand1.700',
                                        }}
                                        _active={{
                                            bg: 'green.500',
                                        }}
                                    >
                                        <CAiOutlinePlus color="black"/>
                                    </Button>
                                </Tooltip>
                            )}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default DishCard;

