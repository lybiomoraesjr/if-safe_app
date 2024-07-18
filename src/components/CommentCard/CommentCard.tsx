import React from "react";
import { formattedDate } from "@/utils/dateUtils";
import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";

type CommentCardProps = {
  name: string;
  text: string;
  date: Date;
};

const CommentCard: React.FC<CommentCardProps> = ({ date, name, text }) => {
  const displayDate = formattedDate(date);
  return (
    <Box
      borderBottomWidth="$1"
      borderColor="$trueGray800"
      $dark-borderColor="$trueGray100"
      $base-pl={0}
      $base-pr={0}
      $sm-pl="$4"
      $sm-pr="$5"
      py="$2"
    >
      <VStack>
        <HStack justifyContent="space-between">
          <Text
            fontSize="$xs"
            color="$coolGray800"
            alignSelf="flex-start"
            $dark-color="$warmGray100"
          >
            Por {name}
          </Text>
          <Text
            fontSize="$xs"
            color="$coolGray800"
            alignSelf="flex-start"
            $dark-color="$warmGray100"
          >
            {displayDate}
          </Text>
        </HStack>

        <Text
          fontSize="$xs"
          color="$coolGray800"
          alignSelf="flex-start"
          $dark-color="$warmGray100"
        >
          {text}
        </Text>
      </VStack>
    </Box>
  );
};

export default CommentCard;
