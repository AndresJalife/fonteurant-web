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
import {FaLock, FaMap, FaPhone, FaUserAlt} from "react-icons/fa";
import ApiRoutes from "../ApiRoutes";
import {FormErrorMessage} from "@chakra-ui/form-control";
import {useNavigate} from "react-router";
import {useAuth} from "./AuthProvider";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaPhone = chakra(FaPhone);
const CFaMapLocation = chakra(FaMap);

const PasswordInput = ({id, text, isInvalid}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <FormControl isInvalid={isInvalid}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<CFaLock color="gray.500"/>}
                />
                <Input
                    required
                    color='black'
                    id={id}
                    type={showPassword ? "text" : "password"}
                    placeholder={text}
                />
                <InputRightElement width="5.2rem">
                    <Button rounded={'lg'} h="1.75rem" size="sm" colorScheme="brand2" onClick={handleShowClick}>
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
}

const Signup = ({show, onClose}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();
    const {signIn} = useAuth();
    const initialRef = useRef()

    const handleClose = () => {
        setFormError(null)
        if (onClose && !isLoading) onClose()
    }

    const isPasswordSecure = (password) => {
        return password.length > 7 && password.toLowerCase() !== password;
    }

    const handleRegister = async e => {
        e.preventDefault();
        setIsLoading(true);
        const elements = e.target.elements;
        console.log(elements);
        const password = elements.password.value;
        if (password !== elements.password_confirmation.value) {
            setFormError('Las contraseñas son distintas');
        } else if (!isPasswordSecure(password)){
            setFormError('La contraseña no es segura. \n Debe contener al menos 8 caracteres y una mayúscula.');
        } else {
            const result = await ApiRoutes.register(
                elements.email.value,
                password,
                elements.location.value,
                elements.phone_number.value
            );
            if (!result['id']) {
                setFormError('Email invalido');
            } else {
                await signIn(elements.email.value, password);
                navigate('/restaurants');
            }
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
                        <Heading color="#565656">Registrarse</Heading>
                        <Box minW="100%">
                            <form onSubmit={handleRegister}>
                                <Stack
                                    spacing={4}
                                    p="1rem"
                                    backgroundColor="whiteAlpha.900"
                                >
                                    <FormControl isInvalid={!!formError}>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaUserAlt color="gray.500"/>}
                                            />
                                            <Input color='black' type="email" id={"email"} required
                                                   placeholder="Email" ref={initialRef}/>
                                        </InputGroup>
                                    </FormControl>
                                    <PasswordInput isInvalid={!!formError} text={"Contraseña"} id={'password'}/>
                                    <PasswordInput isInvalid={!!formError} text={"Repetir Contraseña"}
                                                   id={'password_confirmation'}/>
                                    <FormControl isInvalid={!!formError}>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaMapLocation color="gray.500"/>}
                                            />
                                            <Input color='black' type="text" required id={"location"}
                                                   placeholder="Dirección"/>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl isInvalid={!!formError}>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaPhone color="gray.500"/>}
                                            />
                                            <Input color='black' type="tel" id={"phone_number"} required
                                                   placeholder="Telefono"/>
                                        </InputGroup>
                                        <FormErrorMessage>{formError ? formError : ''}</FormErrorMessage>
                                    </FormControl>
                                    <Button
                                        rounded={'lg'}
                                        type="submit"
                                        variant="solid"
                                        colorScheme="brand1"
                                        color='#565656'
                                        width="full"
                                        isLoading={isLoading}
                                    >
                                        Crear cuenta
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

export default Signup
