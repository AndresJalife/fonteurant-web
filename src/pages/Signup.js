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
import {FaLock, FaUserAlt, FaPhone, FaMap} from "react-icons/fa";
import LayoutDefault from "../components/LayoutDefault";
import ApiRoutes from "../ApiRoutes";
import {useAuth} from "../components/AuthProvider";
import {useNavigate} from "react-router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaPhone = chakra(FaPhone);
const CFaMapLocation = chakra(FaMap);

const ContraseñaInput = ({id, text}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
      <FormControl>
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
          <Button h="1.75rem" size="sm" colorScheme="brand2" onClick={handleShowClick}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
  );
}

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
        <Heading color="brand1.500">Registrarse</Heading>
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
                    children={<CFaUserAlt color="gray.500"/>}
                  />
                  <Input color='black' type="email" id={"email"} required placeholder="Email"/>
                </InputGroup>
              </FormControl>
              <ContraseñaInput text={"Contraseña"} id={'password'}/>
              <ContraseñaInput text={"Repetir Contraseña"} id={'password_confirmation'} />
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
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="brand1"
                color='black'
                width="full"
                isLoading={isLoading}
              >
                Crear cuenta
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
