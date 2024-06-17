import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { House, PlusSquare, UserCircle } from "phosphor-react-native";

import Home from "@/screens/Home";
import Profile from "@/screens/Profile";

import theme from "@/theme";

import NewOccurrenceScreen from "@/screens/NewOccurrenceScreen";
import OccurrenceDetailScreen from "@/screens/OccurrenceDetailScreen";

type AppRoutes = {
  home: undefined;
  newOccurrenceScreen: undefined;
  profile: undefined;
  occurrenceDetailScreen: undefined;
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
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={iconSize} />,
        }}
      />

      <Screen
        name="newOccurrenceScreen"
        component={NewOccurrenceScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusSquare color={color} size={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <UserCircle color={color} size={iconSize} />
          ),
        }}
      />

      <Screen
        name="occurrenceDetailScreen"
        component={OccurrenceDetailScreen}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
