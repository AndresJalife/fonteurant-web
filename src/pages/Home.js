import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue, Heading,
} from '@chakra-ui/react';

import background from "../img/burger.jpg";
import {useState} from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Home = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={`url(${background})`}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
        >
            <VStack
                w={'full'}
                align='stretch'
                px={useBreakpointValue({base: 4, md: 8})}
                bgGradient={'linear(to-r, blackAlpha.200, transparent)'}
                style={useBreakpointValue({
                    base: {padding: "20vh 5vh 0 5vw"},
                    md: {padding: "20vh 0 0 18vw"}
                })}
            >
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Heading
                        fontWeight={600}
                        fontSize={{base: '3xl', sm: '4xl', md: '6xl'}}
                        lineHeight={'110%'}
                        style={{fontFamily: "'Roboto Slab', serif", color: "#f3d503"}}
                    >
                        FONTEURANT
                    </Heading>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({base: 'xl', md: '3xl'})}
                    >
                        De los mejores restaurantes a tu casa.
                        <br/>
                        Pagá con <span style={{color: "#f3d503"}}>criptomonedas</span> o con el medio <br/> de pago que
                        más te guste.
                    </Text>
                    <Stack direction={'row'} style={{marginTop: "40px"}}>
                        <Button
                            rounded={'lg'}
                            px={6}
                            mr={2}
                            colorScheme={'brand1'}
                            color={'black'}
                            _hover={{bg: 'brand1.700'}}
                            onClick={() => setShowSignUp(true)}
                        >
                            Registrarse
                        </Button>
                        <Button
                            rounded={'lg'}
                            px={6}
                            onClick={() => setShowLogin(true)}
                        >
                            Ingresar
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
            <Signup show={showSignUp} onClose={() => setShowSignUp(false)}/>
            <Login show={showLogin} onClose={() => setShowLogin(false)}/>
        </Flex>
    );
}

export default Home
