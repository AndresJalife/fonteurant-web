import {useState} from "react";
import {Button} from "@chakra-ui/button";
import {
    Center, chakra,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading, Input, InputGroup, InputLeftElement, InputRightElement,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {useAuth} from "./AuthProvider";
import ApiRoutes from "../ApiRoutes";
import {AiFillBank, AiFillCreditCard} from "react-icons/all";
import {useClipboard} from '@chakra-ui/react'

const PaymentMethod = {1: "CASH", 2: "BANK_TRANSFER", 3: "CRYPTO", 4: "CREDIT_CARD"}
const CAiFillCreditCard = chakra(AiFillCreditCard);
const CAiFillBank = chakra(AiFillBank);

const Checkout = ({isOpen, onClose, onSubmit, order, restaurant}) => {
    const [payment, setPayment] = useState('1')
    const [isLoading, setIsLoading] = useState(false)
    const {hasCopied, onCopy} = useClipboard(restaurant?.cbu)
    const {user} = useAuth();
    const [userCreditCard, setUserCreditCard] = useState(user?.credit_card)

    const total = order?.map(d => d.amount * d.price)?.reduce((p1, p2) => p1 + p2, 0)

    const disableCreditPayment = (payment === '4') && !userCreditCard

    const postOrder = async () => {
        setIsLoading(true)
        const dishes = order.map(d => ({[d.id]: d.amount})).reduce((a, b) => ({...a, ...b}))
        try {
            if (payment === '3') {
                await handleCryptoPayment()
            }
            await ApiRoutes.postOrder(dishes, PaymentMethod[payment], user?.id, restaurant?.id)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
            onSubmit()
        }
    }

    const handleCryptoPayment = async () => {
        const {ethereum} = window;
        if (!ethereum && ethereum?.isMetaMask) {
            console.log("Please install Metamask")
            return
        }

        await ethereum.request({method: 'eth_requestAccounts'});

        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            to: '0xcAF8391EcF53464c1231aA73394B00cFD5f72568',
            from: ethereum.selectedAddress, // must match user's active address.
            value: '0x000010000000000000',
            chainId: '0x61', // BSC Testnet
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        console.log(txHash)
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size='full'
            >
                <DrawerOverlay/>
                <DrawerContent
                    bg={useColorModeValue('gray.50', 'gray.800')}
                >
                    <DrawerCloseButton disabled={isLoading}/>

                    <DrawerHeader>Completar Pago</DrawerHeader>

                    <DrawerBody>
                        <Center>
                            <Flex
                                align={'center'}
                                justify={'center'}
                                mt={20}
                            >
                                <Stack
                                    spacing={4}
                                    w={'full'}
                                    maxW={'lg'}
                                    bg={useColorModeValue('white', 'gray.700')}
                                    rounded={'xl'}
                                    boxShadow={'lg'}
                                    p={6}
                                    my={12}
                                >
                                    <Heading lineHeight={1} fontSize='xl' mb={2}>
                                        Resumen del pedido
                                    </Heading>
                                    <Text
                                        fontSize='md'
                                        color={useColorModeValue('gray.800', 'gray.400')}>
                                        Restaurante: <span style={{fontWeight: 'bold'}}>{restaurant?.name}</span>
                                    </Text>
                                    <Text
                                        fontSize='md'
                                        color={useColorModeValue('gray.800', 'gray.400')}>
                                        Direcci??n de entrega: <span style={{fontWeight: 'bold'}}>{user?.location}</span>
                                    </Text>
                                    <Text
                                        fontSize='md'
                                        color={useColorModeValue('gray.800', 'gray.400')}>
                                        Total: <span style={{fontWeight: 'bold'}}>${total}</span>
                                    </Text>
                                    <Divider pt={2}/>
                                    <Heading lineHeight={1} fontSize='xl' mb={2}>
                                        Forma de pago
                                    </Heading>
                                    <Stack spacing={6}>
                                        <div>
                                            <RadioGroup onChange={setPayment} value={payment}>
                                                <Stack direction='row'>
                                                    <Radio value='1' isDisabled={isLoading}>Efectivo</Radio>
                                                    {restaurant?.cbu &&
                                                    <Radio value='2' isDisabled={isLoading}>Transferencia</Radio>}
                                                    {restaurant?.wallet_address &&
                                                    <Radio value='3' isDisabled={isLoading}>Metamask</Radio>}
                                                    {restaurant?.cbu &&
                                                    <Radio value='4' isDisabled={isLoading}>Tarjeta</Radio>}
                                                </Stack>
                                            </RadioGroup>
                                        </div>
                                        {payment === '2' && <div>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<CAiFillBank size='20px' color="gray.500"/>}
                                                />
                                                <Input readOnly color='black' id={"cbu"} placeholder="CBU"
                                                       defaultValue={restaurant?.cbu}/>
                                                <InputRightElement width='5.2rem'>
                                                    <Button h='1.75rem' size='sm' onClick={onCopy}>
                                                        {hasCopied ? 'Copiado' : 'Copiar'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </div>}
                                        {payment === '4' && <div>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<CAiFillCreditCard color="gray.500"/>}
                                                />
                                                <Input
                                                    color='black' type="text"
                                                    onChange={(e) => setUserCreditCard(e.target.value)}
                                                    placeholder="Tarjeta de cr??dito"
                                                    defaultValue={user?.credit_card || ''}
                                                />
                                            </InputGroup>
                                        </div>}
                                        <div>
                                            {payment === '1' && (<Button
                                                bg={'brand1.500'}
                                                color='#565656'
                                                _hover={{
                                                    bg: 'brand1.700',
                                                }}
                                                width="full"
                                                onClick={postOrder}
                                                isLoading={isLoading}
                                            >
                                                Pagar en efectivo
                                            </Button>)}
                                            {payment === '2' && (<Button
                                                bg={'brand1.500'}
                                                color='#565656'
                                                _hover={{
                                                    bg: 'brand1.700',
                                                }}
                                                width="full"
                                                onClick={postOrder}
                                                isLoading={isLoading}
                                            >
                                                Pagar con transferencia
                                            </Button>)}
                                            {payment === '3' && (<Button
                                                bg={'brand1.500'}
                                                color='#565656'
                                                _hover={{
                                                    bg: 'brand1.700',
                                                }}
                                                width="full"
                                                onClick={postOrder}
                                                isLoading={isLoading}
                                            >
                                                Pagar con Metamask
                                            </Button>)}
                                            {payment === '4' && (<Button
                                                bg={'brand1.500'}
                                                color='#565656'
                                                _hover={{
                                                    bg: 'brand1.700',
                                                }}
                                                width="full"
                                                onClick={postOrder}
                                                disabled={disableCreditPayment}
                                                isLoading={isLoading}
                                            >
                                                Pagar con tarjeta
                                            </Button>)}
                                        </div>
                                    </Stack>
                                </Stack>
                            </Flex>
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Checkout
