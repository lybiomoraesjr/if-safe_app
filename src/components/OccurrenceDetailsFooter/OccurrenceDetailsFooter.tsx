import { Divider } from "@rneui/base";
import { ChatCircle, Warning } from "phosphor-react-native";
import { View, Text } from "react-native";
import { Picture } from "./OccurrenceDetailsFooter.styles";

type OccurrenceDetailsFooterProps = {};

const OccurrenceDetailsFooter: React.FC<OccurrenceDetailsFooterProps> = () => {
  return (
    <View>
      <Divider style={{ margin: 18 }} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row" }}>
          <Warning size={16} />
          <Text>5</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ChatCircle size={16} />
          <Text>5</Text>
        </View>
      </View>

      <Divider style={{ margin: 18 }} />

      <View style={{ flexDirection: "row" }}>
        <Picture
          source={{ uri: "https://www.save-free.com/cdn/https://instagram.fccm11-1.fna.fbcdn.net/v/t51.2885-19/274568729_917049325630882_5233696976206523807_n.jpg?_nc_ht=instagram.fccm11-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=my5EiGuM9JUQ7kNvgHexDaH&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AYBi-x7O6rGmNURCCowIMoL2-GsAnLlFpSTtjwQgsZJOOw&oe=66604DE3&_nc_sid=1e20d2" }}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />

        <View style={{flex: 1}}>
          <View style={{ flexDirection: "row" }}>
            <Text>Thales Miranda dos Santos</Text>

            <Text>01/01/2021</Text>
          </View>

          <Text>Passei ontem e tomei um choque, muito perigoso</Text>
        </View>
      </View>
    </View>
  );
};

export default OccurrenceDetailsFooter;
