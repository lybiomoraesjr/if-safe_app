import React from "react";
import { View } from "react-native";
import OcurrenceDetails from "../../components/OcurrenceDetails";
import { ocurrenceDetailsMock } from "../../utils/ocurrenceDetailsMock";

const OcurrenceDetailsPage: React.FC = () => {
  return (
    <View>
      <OcurrenceDetails ocurrenceDetails={ocurrenceDetailsMock} />
    </View>
  );
};

export default OcurrenceDetailsPage;
