import React from "react";
import { Container } from "./OccurrenceList.styles";
import { FlatList } from "react-native";
import { Occurrence } from "../../types";
import OcurrenceItem from "../OccurrenceItem";

interface OccurrenceListProps {
  onInteract: () => void;
  occurrences: Occurrence[];
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
          <OcurrenceItem
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
