import React from "react";
import { View } from "react-native";
import OcurrenceDetails from "../../components/OcurrenceDetails";
import { ocurrenceDetailsMock } from "../../utils/ocurrenceDetailsMock";
import { userMock } from "../../utils/userMock";
import HomeHeader from "../../components/HomeHeader";
import { Divider } from "@rneui/base";
import { Title } from "./OcurrenceDetailsPage.styles";
import OccurrenceDetailsFooter from "../../components/OccurrenceDetailsFooter";

const OcurrenceDetailsPage: React.FC = () => {
  return (
    <View>
      <HomeHeader user={userMock} />

      <Title>Ocorrência:</Title>
      <Divider style={{ margin: 18 }} />

      <OcurrenceDetails ocurrenceDetails={ocurrenceDetailsMock} />

      <OccurrenceDetailsFooter />
    </View>
  );
};

export default OcurrenceDetailsPage;
