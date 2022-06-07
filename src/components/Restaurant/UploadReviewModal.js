import React from "react";
import {
    Button,
    Center,
    Flex, FormControl, InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, Stack, Textarea
} from "@chakra-ui/react";
import {useState} from "react";
import apiRoutes from "../../ApiRoutes";

const UploadReviewModal = ({show, onClose, restoName, restoId}) => {
    const [comment, setComment] = useState('')

    const onClose2 = () => {
        const rating = document.getElementById('rating');
        const value = parseInt(rating.options[rating.selectedIndex].value);
        if (!isNaN(value)) {
            apiRoutes.uploadReview(value, comment, restoId);
        }
        onClose()
    }

    const handleInputChange = (e) => {
        let inputValue = e.target.value
        setComment(inputValue)
    }

    return (
        <Modal
            isOpen={show}
            onClose={onClose}
            motionPreset='scale'
            isCentered
            closeOnOverlayClick={false}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Center>
                        <Flex>
                            <div>¿Que tal te pareció el {restoName}?</div>
                        </Flex>
                    </Center>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <div className={"romboTkm"}>
                        <p></p>
                        {/*<p>Siendo 1 muy malo y 5 muy bueno</p>*/}
                    </div>

                    <form className="centeral">
                        <Stack>
                            <FormControl>
                                <InputGroup id="seleect">
                                    <Select placeholder='Rating' id="rating" >
                                        <option value='1'>1 (Muy malo)</option>
                                        <option value='2'>2 (Malo)</option>
                                        <option value='3'>3 (Normal)</option>
                                        <option value='4'>4 (Bueno)</option>
                                        <option value='5'>5 (Muy Bueno)</option>
                                    </Select>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Textarea color='black' value={comment} onChange={handleInputChange} required placeholder="Comentario"/>
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="solid"
                        type="submit"
                        colorScheme="brand1"
                        color='black'
                        width="full"
                        onClick={onClose2}
                    >
                        Cargar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UploadReviewModal;
