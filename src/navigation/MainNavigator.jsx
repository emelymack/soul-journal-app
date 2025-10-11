import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import JournalListScreen from "../screens/Journal/JournalListScreen";
import AuthStackNavigator from "./AuthStackNavigator";

export default function MainNavigator() {
  const user = useSelector((state) => state.authReducer.user);

  console.log(user)

  return (
    <NavigationContainer>
      { user ? <JournalListScreen /> : <AuthStackNavigator /> }
    </NavigationContainer>
  )
}