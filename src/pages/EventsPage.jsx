import React, { useState } from "react";
import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { OrangeButton } from "../components/ui/OrangeButton";
import { EventCard } from "../components/EventCard";
import { TextInput } from "../components/ui/TextInput";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState("");

  const filteredEvents = events.filter((event) => {
    const eventCategories = categories
      .filter((category) => event.categoryIds.includes(category.id))
      .map((category) => category.name);

    return (
      event.title.toLowerCase().includes(searchField.toLowerCase()) ||
      eventCategories.some((eventCategory) =>
        eventCategory.toLowerCase().includes(searchField.toLowerCase())
      )
    );
  });

  const handleChange = (event) => setSearchField(event.target.value);

  return (
    <Box>
      <Heading textAlign="center" marginTop={10}>
        Events
      </Heading>

      <Center marginTop={8}>
        <Stack>
          <TextInput
            changeFn={handleChange}
            placeholder="Enter title or category..."
          />
          <OrangeButton as={Link} to="/new" size="sm" alignSelf="start">
            + Add event
          </OrangeButton>
        </Stack>
      </Center>

      <Box
        display="flex"
        justifyContent="center"
        paddingTop={10}
        paddingBottom={20}
      >
        <Flex wrap="wrap" direction="row" justify="center" width="80vw" gap={5}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} categories={categories} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
