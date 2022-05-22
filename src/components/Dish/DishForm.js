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
    Stack,
    Textarea
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import FileUpload from "../FileUpload";
import {AiFillDollarCircle, BiDish, MdTitle} from "react-icons/all";
import {uploadFile} from "../../utils/DropboxAPI";
import ApiRoutes from "../../ApiRoutes";

const CMdTitle = chakra(MdTitle);
const CAiFillDollarCircle = chakra(AiFillDollarCircle);
const CBiDish = chakra(BiDish);

const DishForm = ({restaurantId, show, onClose}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const fileUpload = useRef();
    const initialRef = useRef()

    const handleClose = () => {
        setFormError(null)
        if (onClose && !isLoading) onClose()
    }

    const handleAddDish = async (e) => {
        e.preventDefault()
        setFormError(null)

        const elements = e.target.elements
        const name = elements?.name?.value
        const description = elements?.description?.value
        const price = parseFloat(elements?.price?.value)
        const filename = fileUpload.current?.filename
        const file = fileUpload.current?.file

        if (!name) {
            setFormError('Nombre requerido')
            return
        }
        if (!description) {
            setFormError('Descripción requerida')
            return
        }
        if (!price) {
            setFormError('Precio requerido')
            return
        }
        if (!filename || !file) {
            setFormError('Foto requerida')
            return
        }

        setIsLoading(true)
        const closeCallback = () => {
            setIsLoading(false)
            handleClose()
        }

        try {
            const dish = await ApiRoutes.postDish(restaurantId, name, price, description)
            closeCallback()
            uploadFile(file, filename, dish?.id, closeCallback, closeCallback)
        } catch (e) {
            console.log(e)
            closeCallback()
        }

    }

    return (
        <Modal
            isOpen={show}
            onClose={handleClose}
            motionPreset='scale'
            isCentered
            closeOnOverlayClick={false}
            initialFocusRef={initialRef}
        >
            <form onSubmit={handleAddDish}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            <Flex>
                                <Center mr={2}>
                                    <CBiDish color="gray.500"/>
                                </Center>
                                <div>Nuevo Plato</div>
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
                                    <Input color='black' type="text" id={"name"} placeholder="Nombre" ref={initialRef}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Textarea
                                        id={"description"}
                                        placeholder='Descripción'
                                        resize='none'
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CAiFillDollarCircle color="gray.500"/>}
                                    />
                                    <Input color='black' type="number" id={"price"}
                                           placeholder="Precio"/>
                                </InputGroup>
                            </FormControl>
                            <FileUpload stateRef={fileUpload} name="Foto"/>
                            <div style={{margin: "10px 5px -10px 5px", color: "red"}}>{formError ? formError : ''}</div>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            rounded={'lg'}
                            type="submit"
                            variant="solid"
                            colorScheme="brand1"
                            color='black'
                            width="full"
                            isLoading={isLoading}
                        >
                            Crear
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default DishForm
