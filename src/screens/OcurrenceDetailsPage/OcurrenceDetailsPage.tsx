import React from "react";
import { ScrollView, View } from "react-native";
import OcurrenceDetails from "../../components/OccurrenceDetails";
import { ocurrenceDetailsMock } from "../../utils/ocurrenceDetailsMock";
import { userMock } from "../../utils/userMock";
import HomeHeader from "../../components/HomeHeader";
import { Divider } from "@rneui/base";
import { Container, Title } from "./OcurrenceDetailsPage.styles";
import OccurrenceDetailsFooter from "../../components/OccurrenceDetailsFooter";

const OcurrenceDetailsPage: React.FC = () => {
  return (
    <Container>
      <HomeHeader user={userMock} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Title>Ocorrência:</Title>
        <Divider style={{ margin: 18 }} />

        <OcurrenceDetails ocurrenceDetails={ocurrenceDetailsMock} />

        <OccurrenceDetailsFooter />
      </ScrollView>
    </Container>
  );
};

export default OcurrenceDetailsPage;
