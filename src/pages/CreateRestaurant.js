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
import {FaMap, FaBitcoin, FaCreditCard, FaCalendarTimes, FaAmilia, FaMapMarkerAlt} from "react-icons/fa";
import LayoutDefault from "../components/LayoutDefault";
import ApiRoutes from "../ApiRoutes";
import {useNavigate} from "react-router";
import {useAuth} from "../components/AuthProvider";

const CFaBitcoin = chakra(FaBitcoin);
const CFaCreditCard = chakra(FaCreditCard);
const CFaCalendarTimes = chakra(FaCalendarTimes);
const CFaMapMarkerAlt = chakra(FaMapMarkerAlt);
const CFaAmilia = chakra(FaAmilia);
const CFaMapLocation = chakra(FaMap);

const Signup = () => {
    const {user} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async e => {
        e.preventDefault();
        setIsLoading(true);
        if (!user){
            setFormError('Tiene que iniciar sesión');
            setIsLoading(false);
            return;
        }
        const elements = e.target.elements;
        const result = await ApiRoutes.createRestaurant(
            user.id,
            elements.name.value,
            elements.location.value,
            elements.cbu.value,
            elements.wallet.value,
            elements.schedule.value,
            parseInt(elements.scope.value)

        );
        console.log(result);
        if (!result['id']) {
            setFormError('El restaurante ya existe');
        } else {
            navigate("/");
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
                marginTop="5%"
            >
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
                                        children={<CFaMapMarkerAlt color="gray.500"/>}
                                    />
                                    <Input color='black' type="text" required id={"location"} placeholder="Dirección"/>
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
                                    <Input color='black' id={"wallet"} placeholder="Billetera de Criptomonedas"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaCalendarTimes color="gray.500"/>}
                                    />
                                    <Input color='black' id={"schedule"} required placeholder="Horarios de Apertura"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaMapLocation color="gray.500"/>}
                                    />
                                    <Input color='black' type="number" id={"scope"} required placeholder="Radio de cobertura (KM)"/>
                                </InputGroup>
                            </FormControl>
                            <p className={"error"}>{formError ? formError : ''}</p>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="brand1"
                                color='black'
                                width="full"
                                isLoading={isLoading}>

                                Crear

                            </Button>

                        </Stack>
                    </form>
                </Box>
            </Stack>
        </LayoutDefault>
    )
}

export default Signup
