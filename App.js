import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Platform,
} from "react-native";
import RootLayout from "@/components/layout/RootLayout";
import Header from "./src/components/Header";
import JournalListScreen from "./src/screens/Journal/JournalListScreen";
import { lightTheme } from "./src/global/theme";
import CustomText from "./src/components/customText/CustomText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Provider } from "react-redux";
import { soulJournalStore } from "./src/store";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  return (
    <RootLayout>
      
          <Provider store={soulJournalStore}>
            <View style={styles.container}>
              {/* <View style={styles.container}>
        <Header title={"Journal Entries"} />
        <Pressable
          onPress={() => alert("Button Pressed!")}
          style={styles.button}
        >
          <AntDesign name="plus" size={14} style={{ marginRight: 6 }} />
          <CustomText size={14}>New Entry</CustomText>
        </Pressable>
        <JournalListScreen />
      </View> */}
              <MainNavigator />
            </View>
            <StatusBar style="dark" />
          </Provider>
    </RootLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});
