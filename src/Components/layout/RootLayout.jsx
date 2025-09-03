import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

const RootLayout = ({ children }) => {
  const [loaded, error] = useFonts({
    "Nunito-SemiBold": require("../../../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Light": require("../../../assets/fonts/Nunito-Light.ttf"),
    "Nunito-LightItalic": require("../../../assets/fonts/Nunito-LightItalic.ttf"),
    "Nunito-Italic": require("../../../assets/fonts/Nunito-Italic.ttf"),
    "PlayfairDisplay-Bold": require("../../../assets/fonts/PlayfairDisplay-Bold.ttf"),
    "PlayfairDisplay-BoldItalic": require("../../../assets/fonts/PlayfairDisplay-BoldItalic.ttf"),
    "PlayfairDisplay-SemiBold": require("../../../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    "PlayfairDisplay-Italic": require("../../../assets/fonts/PlayfairDisplay-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <>{children}</>;
};

export default RootLayout;

const styles = StyleSheet.create({});
