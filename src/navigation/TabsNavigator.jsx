import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import JournalStackNavigator from "./JournalStackNavigator";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useThemeColors } from "../hooks/useThemeColors";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const theme = useThemeColors();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    tabBar: {
      height: 62,
      paddingTop: 5,
      backgroundColor: theme.background,
      borderColor: null
    },
    iconContainer: {
      backgroundColor: theme.primary,
      position: "absolute",
      width: 70,
      height: 50,
      top: -5,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.8,
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Journal"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.textPrimary,
        tabBarInactiveTintColor: theme.textSecondary,
      }}
    >
      {/* Journal Entries List Screen */}
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
                color={focused ? theme.textPrimary : theme.textSecondary}
              />
            </>
          ),
        }}
      />

      {/* New Entry Screen */}
      <Tab.Screen
        name="New Entry"
        component={JournalStackNavigator}
        initialParams={{ screen: "New Journal Entry" }}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View style={focused && styles.iconContainer} />
              <FontAwesome6
                name="plus"
                size={24}
                color={focused ? theme.textPrimary : theme.textSecondary}
              />
            </>
          ),
        }}
      />

      {/* Theme Toggler */}
      <Tab.Screen
        name="Theme"
        initialParams={{ screen: "New Journal Entry" }}
        options={{
          tabBarIcon: () => (
            <Feather 
              name={theme.mode === 'dark' ? "sun" : "moon"}
              size={24}
              color={theme.textSecondary}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            dispatch(toggleTheme())
          }
        }}
      >
      {() => null}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabsNavigator;
