import React from "react";
import { ScrollView } from "react-native";
import OcurrenceDetails from "../../components/OccurrenceDetails";
import { ocurrenceDetailsMock } from "../../utils/ocurrenceDetailsMock";
import { userMock } from "../../utils/userMock";
import HomeHeader from "../../components/HomeHeader";
import { Divider } from "@rneui/base";
import { Container, Title } from "./OcurrenceDetailsPage.styles";
import OccurrenceFooter from "../../components/OccurrenceFooter";

const OcurrenceDetailsPage: React.FC = () => {
  return (
    <Container>
      <HomeHeader user={userMock} />


      
        <Title>Ocorrência:</Title>
        <Divider style={{ margin: 18 }} />

        <OcurrenceDetails
          title={ocurrenceDetailsMock.title}
          description={ocurrenceDetailsMock.description}
          imageUri={ocurrenceDetailsMock.imageUri}
          author={ocurrenceDetailsMock.author}
          date={ocurrenceDetailsMock.date}
          notifiersIDs={ocurrenceDetailsMock.notifiersIDs}
          status={ocurrenceDetailsMock.status}
        />

        <OccurrenceFooter
          notifiersNumber={ocurrenceDetailsMock.notifiersIDs.length}
          commentsNumber={ocurrenceDetailsMock.comments.length}
          comments={ocurrenceDetailsMock.comments}
        />
     
    </Container>
  );
};

export default OcurrenceDetailsPage;
