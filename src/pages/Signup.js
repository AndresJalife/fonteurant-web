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
import {FaLock, FaUserAlt} from "react-icons/fa";
import LayoutDefault from "../components/LayoutDefault";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

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
          <form>
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
                  <Input color='black' type="email" placeholder="Email"/>
                </InputGroup>
              </FormControl>
              <FormControl>
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
                  />
                  <InputRightElement width="5.2rem">
                    <Button h="1.75rem" size="sm" colorScheme="brand2" onClick={handleShowClick}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="brand1"
                color='black'
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

export default Signup
