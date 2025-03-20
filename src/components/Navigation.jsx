import { Box, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box as="nav" width="100%" overflowX="hidden">
      <Flex
        justifyContent="flex-start"
        wrap="nowrap"
        width="100%"
        paddingLeft={{ base: 4, sm: 4, md: 8 }}
        my={2}
        gap={8}
      >
        <Link to="/"> Find events</Link>
        <Link to="/new">Create events</Link>
      </Flex>
      <Divider borderWidth="1px" borderColor="orange.300" />
    </Box>
  );
};
