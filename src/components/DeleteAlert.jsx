import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { OrangeButton } from "./ui/OrangeButton";

export const DeleteAlert = ({ deleteEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <OrangeButton onClick={onOpen} size="sm" marginTop={2}>
        Delete event
      </OrangeButton>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", sm: "sm", md: "md" }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete event</AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this event?
            </AlertDialogBody>

            <AlertDialogFooter gap={2}>
              <Button onClick={onClose} size="sm" rounded="full">
                Cancel
              </Button>
              <OrangeButton onClick={deleteEvent} size="sm">
                Delete
              </OrangeButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
