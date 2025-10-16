import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AuthStackNavigator from "./AuthStackNavigator";
import TabsNavigator from "./TabsNavigator";
import { useEffect, useState } from "react";
import { getSession, initSessionsTable } from "../db";
import { ActivityIndicator, View } from "react-native";
import { setUser } from "../store/slices/authSlice";
import { lightTheme } from "../global/theme";

export default function MainNavigator() {
  const token = useSelector((state) => state.auth.token);
  const [checkingSession, setCheckingSession] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await initSessionsTable();
        console.log("DB initialized");

        const session = await getSession();        

        if (session) {
          console.log("Session found in SQLite:", session);
          dispatch(
            setUser({
              localId: session.localId,
              email: session.email,
              idToken: session.token,
            })
          );
        }
      } catch (error) {
        console.error("Error in app bootstrap: ", error);
      } finally {
        setCheckingSession(false);
      }
    };

    bootstrap();
  }, []);

  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={lightTheme.secondary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <TabsNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
