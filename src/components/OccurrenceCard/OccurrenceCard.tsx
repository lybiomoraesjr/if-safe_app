import React from "react";
import { CaretRight, ChatCircle, Warning } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { formattedDate } from "@/utils/dateUtils";
import {
  Badge,
  BadgeText,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";

interface OccurrenceCardProps extends TouchableOpacityProps {
  image: string;
  alert: number;
  status: string;
  title: string;
  date: Date;
  commentsNumber: number;
  onInteract: () => void;
}

const OccurrenceCard: React.FC<OccurrenceCardProps> = ({
  image,
  alert,
  status,
  title,
  date,
  commentsNumber,
  onInteract,
  ...rest
}) => {
  const displayDate = formattedDate(date);

  const ICON_SIZE = 20;
  return (
    <TouchableOpacity onPress={onInteract} {...rest}>
      <HStack
        bg="$secondary50"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{ uri: image }}
          alt="Imagem da ocorrência"
          size="lg"
          borderRadius={8}
        />
        <VStack flex={1}>
          <Heading fontSize="$lg" color="$secondary950" fontFamily="$heading">
            {title}
          </Heading>
          <HStack>
            <HStack>
              <Warning size={ICON_SIZE} color="#8D8D99" />
              <Text>{alert}</Text>
            </HStack>

            <HStack>
              <ChatCircle size={ICON_SIZE} color="#8D8D99" />
              <Text>{commentsNumber}</Text>
            </HStack>
          </HStack>

          <Box>
            <Badge
              size="md"
              variant="outline"
              borderRadius="$sm"
              action="success"
            >
              <BadgeText>{status}</BadgeText>
            </Badge>
          </Box>

          <Text fontSize="$sm" mt="$1">
            {displayDate}
          </Text>
        </VStack>
        <CaretRight size={32} color="#8D8D99" />
      </HStack>
    </TouchableOpacity>
  );
};

export default OccurrenceCard;
