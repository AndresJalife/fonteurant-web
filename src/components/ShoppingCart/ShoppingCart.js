import {
    Box,
    chakra, Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Image, Link,
    Text
} from "@chakra-ui/react";
import {Button} from "@chakra-ui/button";
import placeholder from "../../img/sushi.jpg";
import {AiOutlinePlus} from "react-icons/all";
import {AiOutlineMinus} from "react-icons/ai";
import {Spacer} from "@chakra-ui/layout";

const CAiOutlinePlus = chakra(AiOutlinePlus)
const CAiOutlineMinus = chakra(AiOutlineMinus)


const ShoppingCart = ({isOpen, onClose, order, addToOrder, subtractFromOrder, removeFromOrder, onSubmit}) => {
    const total = order?.map(d => d.amount * d.price)?.reduce((p1, p2) =>  p1 + p2, 0)
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size='sm'
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Carrito de compras ({order.length} items)</DrawerHeader>

                    <DrawerBody>
                        {order.map(dish => (
                            <div key={dish.id}>
                                <HStack spacing='16px' mb={6}>
                                    <Box w='80px' h='80px'>
                                        <Image
                                            src={dish?.picture || placeholder}
                                            fallbackSrc={placeholder}
                                            alt="Picture of dish"
                                            boxSize='80px'
                                            rounded="lg"
                                        />
                                    </Box>
                                    <Box w='180px' h='80px'>
                                        <Box
                                            fontSize="md"
                                            fontWeight="semibold"
                                            as="h4"
                                            lineHeight="tight"
                                            height='40px'
                                        >
                                            <Text noOfLines={2}>
                                                {dish?.name}
                                            </Text>
                                        </Box>
                                        <Box
                                            fontSize="md"
                                            lineHeight="tight"
                                            height='40px'
                                            pt={3}
                                        >
                                            <Button
                                                size='xs'
                                                variant='outline'
                                                onClick={() => subtractFromOrder(dish?.id)}
                                                mr={2}
                                            >
                                                <CAiOutlineMinus color="black"/>
                                            </Button>
                                            <span>{dish?.amount}</span>
                                            <Button
                                                size='xs'
                                                variant='outline'
                                                onClick={() => addToOrder(dish)}
                                                ml={2}
                                            >
                                                <CAiOutlinePlus color="black"/>
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Spacer/>
                                    <Box w='60px' h='40px'>
                                        <Box
                                            fontSize="md"
                                            fontWeight="semibold"
                                            as="h4"
                                            lineHeight="tight"
                                            height='40px'
                                        >
                                            <Text noOfLines={2} style={{textAlign: "right"}}>
                                                ${dish?.amount * dish?.price}
                                            </Text>
                                        </Box>
                                        <Box
                                            fontSize="sm"
                                            as="h4"
                                            lineHeight="tight"
                                            height='20px'
                                        >
                                            <Link
                                                color="blue"
                                                onClick={() => removeFromOrder(dish?.id)}
                                            >
                                                <div style={{textAlign: "right"}}>Eliminar</div>
                                            </Link>
                                        </Box>
                                    </Box>
                                </HStack>
                            </div>
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Divider />
                    </DrawerFooter>
                    <DrawerFooter>
                        <HStack width='100%'>
                            <Box
                                fontSize="lg"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                            >Total</Box>
                            <Spacer/>
                            <Box
                                fontSize="lg"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                            >${total}</Box>
                        </HStack>
                    </DrawerFooter>
                    <DrawerFooter>
                        <Button
                            colorScheme='brand1'
                            width="full"
                            color='#565656'
                            disabled={order?.length === 0}
                            onClick={onSubmit}
                        >
                            Continuar con el pago
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ShoppingCart
