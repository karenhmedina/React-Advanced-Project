import {
  AspectRatio,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export const EventCard = ({ event, categories }) => {
  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((category) => category.name);

  return (
    <Card
      key={event.id}
      width="250px"
      borderRadius="lg"
      variant="outline"
      _hover={{ transform: "scale(1.01)" }}
    >
      <Link to={`event/${event.id}`}>
        <AspectRatio ratio={16 / 9} width="100%">
          <Image src={event.image} objectFit="cover" borderTopRadius="lg" />
        </AspectRatio>

        <CardBody textAlign="center">
          <Text textTransform="uppercase" color="gray.600" fontSize="xs">
            {eventCategories.join(" / ")}
          </Text>

          <Heading size="md">
            {event.title.length > 18
              ? event.title.slice(0, 18) + "..."
              : event.title}
          </Heading>

          <Text fontSize="xs" marginTop={4}>
            {formatDate(event.startTime)}
          </Text>

          <Text fontSize="sm" marginTop={4} marginBottom={2}>
            {event.description.length > 60
              ? event.description.slice(0, 60) + "..."
              : event.description}
          </Text>
        </CardBody>
      </Link>
    </Card>
  );
};
