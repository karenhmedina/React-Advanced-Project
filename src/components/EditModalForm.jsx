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
import { useEffect, useState } from "react";
import { OrangeButton } from "./ui/OrangeButton";

export const EditModalForm = ({ event, editEvent, onClose }) => {
  const [title, setTitle] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventImage, setEventImage] = useState("");

  useEffect(() => {
    setTitle(event.title);
    setCategoryIds(event.categoryIds.map(String));
    setDescription(event.description);
    setLocation(event.location);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setEventImage(event.image);
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editEvent({
      id: event.id,
      title,
      categoryIds,
      description,
      location,
      startTime,
      endTime,
      eventImage,
    });

    onClose();
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit}
      spacing={4}
      width={{ base: "xs", sm: "xs", md: "sm" }}
    >
      <Box>
        <FormLabel>Event name</FormLabel>
        <Input
          size="sm"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>Categories</FormLabel>
        <CheckboxGroup
          size="sm"
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
          size="sm"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>Location</FormLabel>
        <Input
          size="sm"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>Start Date and Time</FormLabel>
        <Input
          type="datetime-local"
          size="sm"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>End Date and Time</FormLabel>
        <Input
          type="datetime-local"
          size="sm"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </Box>

      <Box>
        <FormLabel>Event Image URL</FormLabel>
        <Input
          type="url"
          size="sm"
          value={eventImage}
          onChange={(event) => setEventImage(event.target.value)}
        />
      </Box>

      <Flex gap={2} paddingTop={8} paddingBottom={3} justify="flex-end">
        <Button onClick={onClose} type="button" size="sm" rounded="full">
          Cancel
        </Button>
        <OrangeButton type="submit" size="sm">
          Edit
        </OrangeButton>
      </Flex>
    </Stack>
  );
};
