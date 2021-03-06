/* eslint-disable */
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
import ApiRoutes from "../../ApiRoutes";
import TagInput from "../TagInput";
import {isValidImage, processImage} from "../../utils/ImageProcessing";

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
        currentDish: {id, name, price, picture, description, tags}
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
    const initialRef = useRef();

    const currentTags = (tags ? tags : []).map((tag) => {
        return {"label": tag, "value": tag};
    });
    const [dishTags, setDishTags] = useState([]);

    useEffect(() => {
        if (edit) {
            setFormData({id, name, price, picture, description})
            setDishTags(currentTags);
        } else {
            setDishTags([]);
        }
    }, [edit, id, name, price, picture, description, tags])

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
        const file = fileUpload.current?.file
        const tags = dishTags.map(t => t.label);

        if (!name) {
            setFormError('Nombre requerido')
            return
        }
        if (!description) {
            setFormError('Descripci??n requerida')
            return
        }
        if (!price) {
            setFormError('Precio requerido')
            return
        }
        if (!file && !edit) {
            setFormError('Foto requerida')
            return
        }
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
            let newPicture = picture || ''
            if (file) {
                newPicture = await processImage(file);
            }
            let dish
            if (edit) {
                dish = await ApiRoutes.putDish(restaurantId, id, name, price, description, newPicture, tags)
            } else {
                dish = await ApiRoutes.postDish(restaurantId, name, price, description, newPicture, tags)
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
                                        placeholder='Descripci??n'
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
                            <FormControl>
                                <TagInput values={dishTags} setValues={setDishTags} />
                            </FormControl>
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
