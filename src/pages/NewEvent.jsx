import React from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";
import { Form } from "../components/Form";
import { useNavigate } from "react-router-dom";

export const NewEvent = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const createUser = async (newUser) => {
    try {
      const usersResponse = await fetch("http://localhost:3000/users");

      if (!usersResponse.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }

      const users = await usersResponse.json();

      const existingUser = users.find(
        (user) => user.name.toLowerCase() === newUser.name.toLowerCase()
      );

      if (existingUser) {
        return existingUser;
      }

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });

      if (!response.ok) {
        throw new Error(`Failed to create user. Status: ${response.status}`);
      }

      newUser.id = (await response.json()).id;
      return newUser;
    } catch (error) {
      console.error("An error occurred in createUser:", error);
      throw error;
    }
  };

  const createEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });

      if (!response.ok) {
        throw new Error(`Failed to create event. Status: ${response.status}`);
      }

      toast({
        title: "Event created!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Failed to create event",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("An error occurred while creating event:", error);
    }
  };

  return (
    <Box
      width={{ base: "md", sm: "md", md: "xl", lg: "3xl" }}
      maxWidth="100%"
      px={{ base: 8, sm: 8, md: 20 }}
      my={8}
    >
      <Heading marginBottom={8}>Create a new event</Heading>

      <Form createEvent={createEvent} createUser={createUser} />
    </Box>
  );
};
