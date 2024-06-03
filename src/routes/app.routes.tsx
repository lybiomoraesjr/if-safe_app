import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { House, List, PlusSquare } from "phosphor-react-native";

import Home from "../screens/Home";
import Profile from "../screens/Profile";

import theme from "../theme";
import OcurrenceDetailsPage from "../screens/OcurrenceDetailsPage";
import MyOccurrencesPage from "../screens/MyOccurrencesPage";
import NewOccurrencePage from "../screens/NewOccurrencePage";

type AppRoutes = {
  home: undefined;
  newOccurrencePage: undefined;
  myOccurrencesPage: undefined;
  profile: undefined; 
  ocurrenceDetailsPage: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const iconSize = 24;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.COLORS.BRAND_LIGHT,
        tabBarInactiveTintColor: theme.COLORS.GRAY_200,
        tabBarStyle: {
          backgroundColor: theme.COLORS.GRAY_800,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: 40,
          paddingTop: 24,
        },
      }}
    >
      <Screen
        name="home"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={iconSize} />,
        }}
      />

      <Screen
        name="newOccurrencePage"
        component={NewOccurrencePage}
        options={{
          tabBarIcon: ({ color }) => <PlusSquare color={color} size={iconSize} />,
        }}
      />

      <Screen
        name="myOccurrencesPage"
        component={MyOccurrencesPage}
        options={{
          tabBarIcon: ({ color }) => <List color={color} size={iconSize} />,
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="ocurrenceDetailsPage"
        component={OcurrenceDetailsPage}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
