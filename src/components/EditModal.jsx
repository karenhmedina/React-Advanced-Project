import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { EditModalForm } from "./EditModalForm";
import { OrangeButton } from "./ui/OrangeButton";

export const EditModal = ({ event, editEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <OrangeButton onClick={onOpen} size="sm" marginTop={2}>
        Edit details
      </OrangeButton>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", sm: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditModalForm
              event={event}
              editEvent={editEvent}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
