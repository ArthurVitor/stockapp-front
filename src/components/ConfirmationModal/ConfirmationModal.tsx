import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { IConfirmationModalProps } from "../../lib/interfaces/props/IConfirmationModalProps";

export function ConfirmationModal({ isOpen, onClose, onConfirm, message, title }: Readonly<IConfirmationModalProps>) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={onClose}>
                        No
                    </Button>
                    <Button colorScheme="teal" onClick={onConfirm} ml={3}>
                        Yes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
