import React from "react";
import { View } from "react-native";
import OcurrenceDetails from "../../components/OcurrenceDetails";
import { ocurrenceDetailsMock } from "../../utils/ocurrenceDetailsMock";
import { userMock } from "../../utils/userMock";
import HomeHeader from "../../components/HomeHeader";
import { Divider } from "@rneui/base";
import { Title } from "./OcurrenceDetailsPage.styles";

const OcurrenceDetailsPage: React.FC = () => {
  return (
    <View>
      <HomeHeader user={userMock} />

      <Title>Ocorrência:</Title>
      <Divider style={{ margin: 18 }} />

      <OcurrenceDetails ocurrenceDetails={ocurrenceDetailsMock} />
    </View>
  );
};

export default OcurrenceDetailsPage;
