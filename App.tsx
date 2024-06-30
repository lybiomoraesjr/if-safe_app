import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import theme from "./src/theme";

import Loading from "./src/components/Loading";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { PhotoContextProvider } from "@/contexts/PhotoContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <PhotoContextProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <AuthContextProvider>
            {fontsLoaded ? <Routes /> : <Loading />}
          </AuthContextProvider>
        </SafeAreaProvider>
      </PhotoContextProvider>
    </ThemeProvider>
  );
}
