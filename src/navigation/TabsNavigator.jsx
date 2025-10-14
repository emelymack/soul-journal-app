import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import JournalStackNavigator from "./JournalStackNavigator";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { lightTheme } from "../global/theme";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Journal"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: lightTheme.textPrimary,
        tabBarInactiveTintColor: lightTheme.textSecondary,
      }}
    >
      <Tab.Screen
        name="Journal"
        component={JournalStackNavigator}
        initialParams={{ screen: "My Journal Entries" }}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View style={focused && styles.iconContainer} />
              <Feather
                name="book-open"
                size={24}
                color={
                  focused ? lightTheme.textPrimary : lightTheme.textSecondary
                }
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="New Entry"
        component={JournalStackNavigator}
        initialParams={{ screen: "Create New Entry" }}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View style={focused && styles.iconContainer} />
              <FontAwesome6
                name="plus"
                size={24}
                color={
                  focused ? lightTheme.textPrimary : lightTheme.textSecondary
                }
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    paddingTop: 10,
  },
  iconContainer: {
    backgroundColor: lightTheme.primary,
    position: "absolute",
    width: "70",
    height: 60,
    top: -7,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8
  },
});
