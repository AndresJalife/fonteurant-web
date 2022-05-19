import {useRef, useState} from "react";
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
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack
} from "@chakra-ui/react";
import {FaLock, FaUserAlt} from "react-icons/fa";
import {useAuth} from "./AuthProvider";
import {FormErrorMessage} from "@chakra-ui/form-control";
import {useNavigate} from "react-router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = ({show, onClose}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const {signIn} = useAuth();
    const navigate = useNavigate();
    const initialRef = useRef()

    const handleClose = () => {
        if (onClose && !isLoading) onClose()
    }

    const handleLogin = async e => {
        e.preventDefault();
        setIsLoading(true);
        const result = await signIn(e.target.elements.email.value, e.target.elements.password.value);
        if (result.error) {
            setLoginFailed(true);
        } else {
            navigate('/restaurants');
        }
        setIsLoading(false);
    };

    return (
        <Modal
            isOpen={show}
            onClose={handleClose}
            motionPreset='scale'
            isCentered
            closeOnOverlayClick={false}
            autoFocus={false}
            initialFocusRef={initialRef}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack
                        flexDir="column"
                        mb="2"
                        justifyContent="center"
                        alignItems="center"
                        mt={5}
                    >
                        <Avatar bg="brand1.500"/>
                        <Heading color="#565656">Ingresar</Heading>
                        <Box minW="100%">
                            <form onSubmit={handleLogin}>
                                <Stack
                                    spacing={4}
                                    p="1rem"
                                    backgroundColor="whiteAlpha.900"
                                >
                                    <FormControl isInvalid={loginFailed}>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaUserAlt color="gray.500"/>}
                                            />
                                            <Input color='black' type="email" placeholder="Email" id='email' required
                                                   ref={initialRef}/>
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
                                                <Button h="1.75rem" size="sm" colorScheme="brand2"
                                                        onClick={handleShowClick} rounded={'lg'}>
                                                    {showPassword ? "Ocultar" : "Mostrar"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>Email o contraseña incorrectos.</FormErrorMessage>
                                    </FormControl>
                                    <Button
                                        isLoading={isLoading}
                                        rounded={'lg'}
                                        type="submit"
                                        variant="solid"
                                        colorScheme="brand1"
                                        color='#565656'
                                        width="full"
                                    >
                                        Ingresar
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Login
