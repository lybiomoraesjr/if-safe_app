import React from "react";
import { Container } from "./OccurrenceList.styles";
import { FlatList } from "react-native";
import { OccurrenceItemType } from "@/types";
import OccurrenceItem from "../OccurrenceItem";

interface OccurrenceListProps {
  onInteract: () => void;
  occurrences: OccurrenceItemType[];
}

const OccurrenceList: React.FC<OccurrenceListProps> = ({
  occurrences,
  onInteract,
}) => {
  return (
    <Container>
      <FlatList
        data={occurrences}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <OccurrenceItem
            imageUri={item.imageUri}
            notifiersNumber={item.notifiersIDs.length}
            status={item.status}
            title={item.title}
            date={item.date}
            onInteract={onInteract}
          />
        )}
      />
    </Container>
  );
};

export default OccurrenceList;
