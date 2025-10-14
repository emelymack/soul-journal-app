import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthStackNavigator from "./AuthStackNavigator";
import TabsNavigator from "./TabsNavigator";

export default function MainNavigator() {
  const token = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
      { token ? <TabsNavigator /> : <AuthStackNavigator /> }
    </NavigationContainer>
  )
}