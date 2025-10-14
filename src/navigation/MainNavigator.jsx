import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthStackNavigator from "./AuthStackNavigator";
import JournalStackNavigator from "./JournalStackNavigator";

export default function MainNavigator() {
  const token = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
      { token ? <JournalStackNavigator /> : <AuthStackNavigator /> }
    </NavigationContainer>
  )
}