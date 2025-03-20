import { Button } from "@chakra-ui/react";

export const OrangeButton = ({ ...props }) => {
  return (
    <Button
      rounded="full"
      bgColor="orange.300"
      _hover={{ bg: "orange.400" }}
      _focus={{ bg: "orange.400" }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
