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
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../AuthProvider";
import {BiDish, FaMap, MdTitle} from "react-icons/all";
import {FaBitcoin, FaCalendarTimes, FaCreditCard, FaMapMarkerAlt} from "react-icons/fa";
import ApiRoutes from "../../ApiRoutes";
import TagInput from "../TagInput";
import FileUpload from "../FileUpload";
import {isValidImage, processImage} from "../../utils/ImageProcessing";


const CMdTitle = chakra(MdTitle);
const CFaBitcoin = chakra(FaBitcoin);
const CFaCreditCard = chakra(FaCreditCard);
const CFaCalendarTimes = chakra(FaCalendarTimes);
const CFaMapMarkerAlt = chakra(FaMapMarkerAlt);
const CFaMapLocation = chakra(FaMap);
const CBiDish = chakra(BiDish);

const EditRestaurant = ({data, show, onClose}) => {
    const {loadUser} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);

    const [values, setValues] = useState([]);
    const fileUpload = useRef();

    useEffect(() => {
        const initialTags = data.tags?.map((tag) => {
            return {"label": tag, "value": tag}
        })
        setValues(initialTags)
    }, [data.tags])

    const handleClose = () => {
        setFormError(null)
        if (onClose) onClose()
    }

    const handleEditRestaurant = async (e) => {
        e.preventDefault()
        setFormError(null)

        const elements = e.target.elements
        const name = elements?.name?.value
        const location = elements?.location?.value
        const cbu = elements?.cbu?.value
        const schedule = elements?.schedule?.value
        const address_wallet = elements?.address_wallet?.value
        const scope = elements?.location_scope?.value
        const file = fileUpload.current?.file
        const tags = values.map((e) => e.value)

        if (file && !isValidImage(file)) {
            setFormError('Las fotos deben pesar menos de 1MB')
            return
        }

        setIsLoading(true)
        const closeCallback = () => {
            setIsLoading(false)
            handleClose()
        }

        try {
            const picture = file ? await processImage(file) : data.picture;
            const response = await ApiRoutes.updateRestaurant(data.id, name, location, cbu, address_wallet, schedule, scope, tags, picture)
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
            <form onSubmit={handleEditRestaurant}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            <Flex>
                                <Center mr={2}>
                                    <CBiDish color="gray.500"/>
                                </Center>
                                <div>Editar Restaurante</div>
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
                                    <Input color='black' id={"name"} required placeholder="Nombre del Restaurante" defaultValue={data.name}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaMapMarkerAlt color="gray.500"/>}
                                    />
                                    <Input color='black' type="text" required id={"location"} placeholder="Dirección" defaultValue={data.address} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaCreditCard color="gray.500"/>}
                                    />
                                    <Input color='black' id={"cbu"} required placeholder="CBU" defaultValue={data.cbu}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaBitcoin color="gray.500"/>}
                                    />
                                    <Input color='black' id={"wallet"} placeholder="Billetera de Criptomonedas" defaultValue={data.wallet_address}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaCalendarTimes color="gray.500"/>}
                                    />
                                    <Input color='black' id={"schedule"} required placeholder="Horarios de Apertura" defaultValue={data.schedule}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaMapLocation color="gray.500"/>}
                                    />
                                    <Input color='black' type="number" id={"scope"} required placeholder="Radio de cobertura (KM)" defaultValue={data.location_scope}/>
                                </InputGroup>
                            </FormControl>
                            <FileUpload stateRef={fileUpload} name="Foto"/>
                            <FormControl>
                                <TagInput values={values} setValues={setValues} />
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

export default EditRestaurant;
