import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { OrangeButton } from "../components/ui/OrangeButton";
import { EditModal } from "../components/EditModal";
import { DeleteAlert } from "../components/DeleteAlert";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users/");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();
  const navigate = useNavigate();
  const toast = useToast();

  const editEvent = async (updatedEvent) => {
    const infoToUpdate = {
      id: updatedEvent.id,
      title: updatedEvent.title,
      categoryIds: updatedEvent.categoryIds.map((id) => Number(id)),
      description: updatedEvent.description,
      location: updatedEvent.location,
      startTime: updatedEvent.startTime,
      endTime: updatedEvent.endTime,
      image: updatedEvent.eventImage,
      createdBy: event.createdBy,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/events/${updatedEvent.id}`,
        {
          method: "PUT",
          body: JSON.stringify(infoToUpdate),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update event. Status: ${response.status}`);
      }

      toast({
        title: "Event updated!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/event/${event.id}`);
    } catch (error) {
      toast({
        title: "Failed to update event",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("An error occurred while updating the event:", error);
    }
  };

  const deleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event. Status: ${response.status}`);
      }

      toast({
        title: "Event deleted!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Failed to delete event",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("An error occurred while deleting the event:", error);
    }
  };

  const creator = users.find((user) => event.createdBy === user.id);
  const creatorName = creator ? creator.name : "unknown";
  const creatorImage = creator ? creator.image : "";

  const categoryNames = categories
    .filter(
      (category) => event.categoryIds && event.categoryIds.includes(category.id)
    )
    .map((category) => category.name);

  return (
    <Box
      width={{ base: "md", sm: "md", md: "xl", lg: "3xl" }}
      maxWidth="100%"
      paddingLeft={{ base: 8, sm: 8, md: 20 }}
      paddingRight={{ base: 8, sm: 0, md: 0 }}
      my={8}
    >
      <OrangeButton as={Link} to="/" size="sm" marginTop={2}>
        Go back
      </OrangeButton>

      <AspectRatio
        width="100%"
        ratio={16 / 9}
        rounded="md"
        marginTop={3}
        overflow="hidden"
      >
        <Image src={event.image} objectFit="cover" width="100%" height="100%" />
      </AspectRatio>

      <Heading marginTop={6}>{event.title}</Heading>

      <Text textTransform="uppercase" color="gray.600" fontSize="lg">
        {categoryNames.join(" / ")}
      </Text>

      <Text marginTop={6} marginBottom={6}>
        {event.description}
      </Text>

      <Text fontWeight="medium">Location</Text>
      <Text marginBottom={6}>{event.location}</Text>

      <Text fontWeight="medium">Date and time</Text>
      <Text>Starts: {formatDate(event.startTime)}</Text>
      <Text marginBottom={6}>Ends: {formatDate(event.endTime)}</Text>

      <Flex gap={2}>
        <EditModal event={event} editEvent={editEvent} />
        <DeleteAlert deleteEvent={deleteEvent} />
      </Flex>

      <Flex align="center" gap={4} marginTop={12}>
        <Avatar size="lg" src={creatorImage} />
        <Box>
          <Text fontSize="sm">Organized by:</Text>
          <Text fontSize="sm" fontWeight="medium">
            {creatorName}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
