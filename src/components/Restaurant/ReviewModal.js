import React from "react";
import {
    Button,
    Center,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack
} from "@chakra-ui/react";
import StarRatings from "react-star-ratings";

const ReviewModal = ({reviews, show, onClose}) => {

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
                            <div>Opiniones</div>
                        </Flex>
                    </Center>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack>
                        {
                            reviews.length > 0 && reviews.map((r) => {
                                return (<div>
                                    <StarRatings
                                        rating={r.score}
                                        starDimension="20px"
                                        starSpacing="5px"
                                        starRatedColor="orange"
                                    />
                                    <div>{r.review}</div>
                                </div>);
                            })
                        }
                        {reviews.length === 0 && <div>No hay opiniones</div>}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="solid"
                        colorScheme="brand1"
                        color='black'
                        width="full"
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReviewModal;
