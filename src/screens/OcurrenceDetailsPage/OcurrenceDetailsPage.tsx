import React from "react";
import { View } from "react-native";
import OcurrenceDetails from "../../components/OcurrenceDetails";
import { ocurrenceDetailsMock } from "../../utils/ocurrenceDetailsMock";
import { userMock } from "../../utils/userMock";
import HomeHeader from "../../components/HomeHeader";

const OcurrenceDetailsPage: React.FC = () => {
  return (
    <View>
      <HomeHeader user={userMock} />

      <OcurrenceDetails ocurrenceDetails={ocurrenceDetailsMock} />
    </View>
  );
};

export default OcurrenceDetailsPage;
