import React, { useState } from "react";
import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { OrangeButton } from "../components/ui/OrangeButton";
import { EventCard } from "../components/EventCard";
import { TextInput } from "../components/ui/TextInput";

export const loader = async () => {
  try {
    const events = await fetch("http://localhost:3000/events");
    if (!events.ok) {
      throw new Error(`Failed to fetch events. Status: ${events.status}`);
    }

    const categories = await fetch("http://localhost:3000/categories");
    if (!categories.ok) {
      throw new Error(
        `Failed to fetch categories. Status: ${categories.status}`
      );
    }

    return {
      events: await events.json(),
      categories: await categories.json(),
      error: null,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      events: [],
      categories: [],
      error: "Failed to load data. Please try again later.",
    };
  }
};

export const EventsPage = () => {
  const { events, categories, error } = useLoaderData();
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

      {error ? (
        <Center marginTop={8}>
          <Text textAlign="center" px={6} color="red.500" fontSize="lg">
            {error}
          </Text>
        </Center>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          paddingTop={10}
          paddingBottom={20}
        >
          <Flex
            wrap="wrap"
            direction="row"
            justify="center"
            width="80vw"
            gap={5}
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  categories={categories}
                />
              ))
            ) : (
              <Text textAlign="center" fontSize="lg" color="gray.500">
                No events found matching your search criteria.
              </Text>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
};
