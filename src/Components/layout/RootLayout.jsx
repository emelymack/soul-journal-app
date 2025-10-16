import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

SplashScreen.preventAutoHideAsync();

const RootLayout = ({ children }) => {
  const [fontsLoaded, error] = useFonts({
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
    // 'AntDesign': AntDesign.font,
    // 'Feather': Feather.font,
    // 'Ionicons': Ionicons.font,
    // 'MaterialCommunityIcons': MaterialCommunityIcons.font,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
