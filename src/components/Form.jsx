import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { OrangeButton } from "./ui/OrangeButton";
import { Link } from "react-router-dom";

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
      const newEvent = {
        title,
        categoryIds: categoryIds.map(Number),
        description,
        location,
        startTime,
        endTime,
        createdBy: user.id,
        image: eventImage,
      };

      const response = await createEvent(newEvent);

      if (response.ok) {
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
    }
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit}
      spacing={4}
      width={{ base: "100%", sm: "sm", md: "md" }}
    >
      <Box>
        <FormLabel>
          Event name <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          placeholder="Free Swimming Lesson"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>
          Categories <span style={{ color: "red" }}>*</span>
        </FormLabel>
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
        <FormLabel>
          Location <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          placeholder="Ferdinand Bolstraat 100, 1072 LM"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>
          Start Date and Time <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>
          End Date and Time <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>
          Organizer <span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          placeholder="Ignacio Doe"
          value={createdBy}
          onChange={(event) => setCreatedBy(event.target.value)}
        />
      </Box>

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

      <Flex gap={2}>
        <Button as={Link} to="/" marginTop={10} size="md" rounded="full">
          Cancel
        </Button>
        <OrangeButton type="submit" marginTop={10}>
          Submit
        </OrangeButton>
      </Flex>
    </Stack>
  );
};
