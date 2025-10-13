import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthStackNavigator from "./AuthStackNavigator";
import JournalStackNavigator from "./JournalStackNavigator";

export default function MainNavigator() {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <NavigationContainer>
      { user ? <JournalStackNavigator /> : <AuthStackNavigator /> }
    </NavigationContainer>
  )
}