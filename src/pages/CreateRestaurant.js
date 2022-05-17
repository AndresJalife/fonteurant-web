import {useState} from "react";
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
import {FaMap, FaPhone, FaBitcoin, FaCreditCard, FaCalendarTimes, FaAmilia} from "react-icons/fa";
import LayoutDefault from "../components/LayoutDefault";
import ApiRoutes from "../ApiRoutes";
import {useNavigate} from "react-router";

const CFaPhone = chakra(FaPhone);
const CFaBitcoin = chakra(FaBitcoin);
const CFaCreditCard = chakra(FaCreditCard);
const CFaCalendarTimes = chakra(FaCalendarTimes);
const CFaAmilia = chakra(FaAmilia);
const CFaMapLocation = chakra(FaMap);

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async e => {
        e.preventDefault();
        setIsLoading(true);
        const elements = e.target.elements;
        console.log(elements);
        if (elements.password.value !== elements.password_confirmation.value) {
            setFormError('Las contraseñas son distintas');
        } else {
            const result = await ApiRoutes.register(
                elements.email.value,
                elements.password.value,
                elements.location.value,
                elements.phone_number.value
            );
            console.log(result);
            if (!result['id']) {
                setFormError('El email ya existe');
            } else {
                navigate("/login");
            }
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
                <Avatar bg="brand1.500"/>
                <Heading color="brand1.500">Crear Restaurante</Heading>
                <Box minW={{base: "90%", md: "468px"}}>
                    <form onSubmit={handleRegister}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaAmilia color="gray.500"/>}
                                    />
                                    <Input color='black' id={"name"} required placeholder="Nombre del Restaurante"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaMapLocation color="gray.500"/>}
                                    />
                                    <Input color='black' type="text" required id={"location"} placeholder="Dirección"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaPhone color="gray.500"/>}
                                    />
                                    <Input color='black' type="tel" id={"phone_number"} required placeholder="Telefono"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaCreditCard color="gray.500"/>}
                                    />
                                    <Input color='black' id={"cbu"} required placeholder="CBU"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaBitcoin color="gray.500"/>}
                                    />
                                    <Input color='black' id={"wallet"} required placeholder="Billetera de Criptomonedas"/>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="brand1"
                                color='black'
                                width="full"
                                isLoading={isLoading}
                            >
                                Crear
                            </Button>
                            {formError ? formError : ''}
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </LayoutDefault>
    )
}

export default Signup
