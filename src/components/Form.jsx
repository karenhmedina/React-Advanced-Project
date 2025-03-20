import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { OrangeButton } from "./ui/OrangeButton";

export const Form = ({ createEvent, createUser }) => {
  const [title, setTitle] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [organizerImage, setOrganizerImage] = useState("");
  const [eventImage, setEventImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await createUser({
      name: createdBy,
      image: organizerImage,
    });

    if (user && user.id) {
      await createEvent({
        title,
        categoryIds: categoryIds.map(Number),
        description,
        location,
        startTime,
        endTime,
        createdBy: user.id,
        image: eventImage,
      });

      setTitle("");
      setCategoryIds([]);
      setDescription("");
      setLocation("");
      setStartTime("");
      setEndTime("");
      setCreatedBy("");
      setOrganizerImage("");
      setEventImage("");
    }
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit}
      spacing={4}
      width={{ base: "100%", sm: "sm", md: "md" }}
    >
      <FormControl isRequired>
        <FormLabel>Event name</FormLabel>
        <Input
          placeholder="Free Swimming Lesson"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FormControl>

      <Box>
        <FormLabel>Categories</FormLabel>
        <CheckboxGroup
          value={categoryIds}
          onChange={(values) => setCategoryIds(values)}
        >
          <Stack>
            <Checkbox value="1">Sports</Checkbox>
            <Checkbox value="2">Games</Checkbox>
            <Checkbox value="3">Relaxation</Checkbox>
            <Checkbox value="4">Workshop</Checkbox>
            <Checkbox value="5">Art</Checkbox>
            <Checkbox value="6">Music</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>

      <Box>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Beginners swimming lesson for children above five..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>Location</FormLabel>
        <Input
          placeholder="Ferdinand Bolstraat 100, 1072 LM"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>Start Date and Time</FormLabel>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>End Date and Time</FormLabel>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </Box>

      <FormControl isRequired>
        <FormLabel>Organizer</FormLabel>
        <Input
          placeholder="Ignacio Doe"
          value={createdBy}
          onChange={(event) => setCreatedBy(event.target.value)}
        />
      </FormControl>

      <Box>
        <FormLabel>Organizer Image URL</FormLabel>
        <Input
          type="url"
          placeholder="https://example.com/organizer-image.jpg"
          value={organizerImage}
          onChange={(event) => setOrganizerImage(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>Event Image URL</FormLabel>
        <Input
          type="url"
          placeholder="https://example.com/event-image.jpg"
          value={eventImage}
          onChange={(event) => setEventImage(event.target.value)}
        />
      </Box>

      <Box>
        <OrangeButton type="submit" marginTop={10}>
          Submit
        </OrangeButton>
      </Box>
    </Stack>
  );
};
