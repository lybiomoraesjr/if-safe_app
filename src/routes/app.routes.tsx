import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { House, PlusSquare, UserCircle } from "phosphor-react-native";

import Home from "@/screens/Home";
import Profile from "@/screens/Profile";

import theme from "@/theme";

import NewOccurrence from "@/screens/NewOccurrence";
import Occurrence from "@/screens/Occurrence";
import { PhotoContextProvider } from "@/contexts/PhotoContext";

type AppRoutes = {
  home: undefined;
  newOccurrence: undefined;
  profile: undefined;
  occurrence: { occurrenceId: string };
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
          tabBarInactiveTintColor: theme.COLORS.GRAY_400,
          tabBarStyle: {
            backgroundColor: theme.COLORS.WHITE,
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
          name="newOccurrence"
          component={NewOccurrence}
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
          name="occurrence"
          component={Occurrence}
          options={{ tabBarButton: () => null }}
        />
      </Navigator>
   
  );
}
