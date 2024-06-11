import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";

const CommentsScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
};

export default CommentsScreen;
