import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => {
  return (
    <Input
      width={{ base: "100%", sm: "sm", md: "md", lg: "xl" }}
      variant="outline"
      onChange={changeFn}
      {...props}
    />
  );
};
