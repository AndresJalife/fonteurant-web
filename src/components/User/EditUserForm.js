import {
    Button, Center,
    chakra, Flex,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack
} from "@chakra-ui/react";
import {useState} from "react";
import {BiDish, MdTitle, FaMap} from "react-icons/all";
import ApiRoutes from "../../ApiRoutes";
import {FaBitcoin, FaPhone} from "react-icons/fa";
import {useAuth} from "../AuthProvider";

const CMdTitle = chakra(MdTitle);
const CBiDish = chakra(BiDish);
const CFaMapLocation = chakra(FaMap);
const CFaPhone = chakra(FaPhone);
const CFaBitcoin = chakra(FaBitcoin);

const EditUserForm = ({show, onClose}) => {
    const {user, loadUser} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);

    const handleClose = () => {
        setFormError(null)
        if (onClose) onClose()
    }

    const handleEditUser = async (e) => {
        e.preventDefault()
        setFormError(null)

        const elements = e.target.elements
        const name = elements?.name?.value
        const location = elements?.location?.value
        const phone_number = elements?.phone_number?.value
        const address_wallet = elements?.address_wallet?.value

        setIsLoading(true)
        const closeCallback = () => {
            setIsLoading(false)
            handleClose()
        }

        try {
            const response = await ApiRoutes.editUser(name, location, phone_number, address_wallet)
            if (response.id) {
                loadUser()
            }
            closeCallback()
        } catch (e) {
            console.log(e)
            closeCallback()
        }

    }

    return (
        <Modal
            isOpen={show}
            onClose={onClose}
            motionPreset='scale'
            isCentered
            closeOnOverlayClick={false}
        >
            <form onSubmit={handleEditUser}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            <Flex>
                                <Center mr={2}>
                                    <CBiDish color="gray.500"/>
                                </Center>
                                <div>Editar Perfil</div>
                            </Flex>
                        </Center>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CMdTitle color="gray.500"/>}
                                    />
                                    <Input color='black' type="text" id={"name"} placeholder="Nombre" defaultValue={user.name}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaMapLocation color="gray.500"/>}
                                    />
                                    <Input
                                        id={"location"}
                                        placeholder='Ubicación'
                                        type="text"
                                        defaultValue={user.location}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaPhone color="gray.500"/>}
                                    />
                                    <Input color='black' type="tel" id={"phone_number"}
                                           placeholder="Teléfono" defaultValue={user.phone_number}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaBitcoin color="gray.500"/>}
                                    />
                                    <Input color='black' type="text" id={"address_wallet"}
                                           placeholder="Billetera de Criptomonedas" defaultValue={user.address_wallet}/>
                                </InputGroup>
                            </FormControl>
                            <div style={{margin: "10px 5px -10px 5px", color: "red"}}>{formError ? formError : ''}</div>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type="submit"
                            variant="solid"
                            colorScheme="brand1"
                            color='black'
                            width="full"
                            isLoading={isLoading}
                        >
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default EditUserForm
