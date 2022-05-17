import {
    Button,
    chakra,
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
import {AiFillDollarCircle, MdTitle} from "react-icons/all";
import {uploadFile} from "../../utils/DropboxAPI";

const CMdTitle = chakra(MdTitle);
const CAiFillDollarCircle = chakra(AiFillDollarCircle);

const DishForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const fileUpload = useRef();

    const handleAddDish = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const name = elements?.name?.value
        const description = elements?.description?.value
        const price = elements?.price?.value
        const filename = fileUpload.current?.filename
        const file = fileUpload.current?.file
        console.log("name", name)
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
        console.log('crear plato')
        // uploadFile(filename, file)
        setIsLoading(false)
    }

    return (
        <Modal
            isOpen={true}
            onClose={{}}
            motionPreset='scale'
            isCentered
        >
            <form onSubmit={handleAddDish}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Nuevo Plato</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CMdTitle color="gray.500"/>}
                                    />
                                    <Input color='black' type="text" id={"name"} placeholder="Nombre"/>
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
