import {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    chakra,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack
} from "@chakra-ui/react";
import {FaLock, FaUserAlt} from "react-icons/fa";
import {useAuth} from "../components/AuthProvider";
import LayoutDefault from "../components/LayoutDefault";
import {FormErrorMessage} from "@chakra-ui/form-control";
import {useNavigate} from "react-router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const {user, signIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user)
            navigate('/');
    }, [user, navigate]);

    const handleLogin = async e => {
        e.preventDefault();
        setIsLoading(true);
        const result = await signIn(e.target.elements.email.value, e.target.elements.password.value);
        if (result.error) {
            setLoginFailed(true);
        } else {
            navigate('/');
        }
        setIsLoading(false);
    };

    return (
        <LayoutDefault>
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="buttons.500"/>
                <Heading color="#565656">Ingresar</Heading>
                <Box minW={{base: "90%", md: "468px"}}>
                    <form onSubmit={handleLogin}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl isInvalid={loginFailed}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.500"/>}
                                    />
                                    <Input color='black' type="email" placeholder="Email" id='email' required/>
                                </InputGroup>
                            </FormControl>
                            <FormControl isInvalid={loginFailed}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.500"
                                        children={<CFaLock color="gray.500"/>}
                                    />
                                    <Input
                                        color='black'
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        id='password'
                                        required
                                    />
                                    <InputRightElement width="5.2rem">
                                        <Button h="1.75rem" size="sm" colorScheme="brand2" onClick={handleShowClick}>
                                            {showPassword ? "Ocultar" : "Mostrar"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>Email o contraseña incorrectos.</FormErrorMessage>
                            </FormControl>
                            <Button
                                isLoading={isLoading}
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="buttons"
                                color='#565656'
                                width="full"
                            >
                                Ingresar
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </LayoutDefault>
    )
}

export default Login
