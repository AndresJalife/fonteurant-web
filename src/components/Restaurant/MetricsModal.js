import React from "react";
import {
    Center,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

const MetricsModal = ({metrics, show, onClose}) => {

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
                            <div>Métricas de tu restaurante</div>
                        </Flex>
                    </Center>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {metrics.length && (
                        <div>
                            <img src={metrics[0]['plot_hash']}/>
                            <img src={metrics[1]['plot_hash']}/>
                        </div>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MetricsModal;
