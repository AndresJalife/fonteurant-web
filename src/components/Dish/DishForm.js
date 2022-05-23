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
import {useEffect, useRef, useState} from "react";
import FileUpload from "../FileUpload";
import {AiFillDollarCircle, BiDish, MdTitle} from "react-icons/all";
import {uploadFile} from "../../utils/DropboxAPI";
import ApiRoutes from "../../ApiRoutes";

const CMdTitle = chakra(MdTitle);
const CAiFillDollarCircle = chakra(AiFillDollarCircle);
const CBiDish = chakra(BiDish);

const DishForm = (
    {
        restaurantId,
        show,
        onClose,
        edit,
        onSubmit,
        currentDish: {id, name, price, picture, description}
    }) => {
    const initialFormData = {
        id: '',
        name: '',
        price: '',
        picture: '',
        description: ''
    };
    const [formData, setFormData] = useState(initialFormData)
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const fileUpload = useRef();
    const initialRef = useRef()

    useEffect(() => {
        if (edit) {
            setFormData({id, name, price, picture, description})
        }
    }, [edit])

    const onChangeForm = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    const handleClose = () => {
        setFormData(initialFormData)
        setFormError(null)
        if (onClose && !isLoading) onClose()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        const name = formData?.name
        const description = formData?.description
        const price = parseFloat(formData?.price)
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
        if ((!filename || !file) && !edit) {
            setFormError('Foto requerida')
            return
        }

        setIsLoading(true)
        const closeCallback = () => {
            setIsLoading(false)
            handleClose()
        }

        try {
            let newPicture = picture || ''
            if (filename && file) {
                newPicture = `${Date.now()}_${filename}`
                uploadFile(file, newPicture, closeCallback, closeCallback)
            }
            let dish
            if (edit) {
                dish = await ApiRoutes.putDish(restaurantId, id, name, price, description, newPicture)
            } else {
                dish = await ApiRoutes.postDish(restaurantId, name, price, description, newPicture)
            }
            onSubmit(dish)
            closeCallback()
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
            <form onSubmit={handleSubmit}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            <Flex>
                                <Center mr={2}>
                                    <CBiDish color="gray.500"/>
                                </Center>
                                <div>{edit ? "Editar" : "Nuevo"} Plato</div>
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
                                    <Input
                                        color='black'
                                        type="text"
                                        placeholder="Nombre"
                                        value={formData.name}
                                        onChange={(e) => onChangeForm("name", e.target.value)}
                                        ref={initialRef}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Textarea
                                        placeholder='Descripción'
                                        resize='none'
                                        value={formData.description}
                                        onChange={(e) => onChangeForm("description", e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CAiFillDollarCircle color="gray.500"/>}
                                    />
                                    <Input
                                        color='black'
                                        type="number"
                                        placeholder="Precio"
                                        value={formData.price}
                                        onChange={(e) => onChangeForm("price", e.target.value)}
                                    />
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
                            {edit ? "Editar" : "Crear"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default DishForm
