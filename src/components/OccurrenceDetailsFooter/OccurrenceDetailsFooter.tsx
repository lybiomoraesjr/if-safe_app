import { Divider } from "@rneui/base";
import { ChatCircle, Warning } from "phosphor-react-native";
import { View, Text } from "react-native";

type OccurrenceDetailsFooterProps = {};

const OccurrenceDetailsFooter: React.FC<OccurrenceDetailsFooterProps> = () => {
  return (
    <View>
      <Divider style={{ margin: 18 }} />

      <View>
        <Warning size={16} />
        <ChatCircle size={16} />
      </View>

      <Divider style={{ margin: 18 }} />
    </View>
  );
};

export default OccurrenceDetailsFooter;
