import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import RootLayout from "@/components/layout/RootLayout"
import { Provider } from "react-redux";
import { soulJournalStore } from "./src/store";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  return (
    <RootLayout>
      
          <Provider store={soulJournalStore}>
            <View style={styles.container}>
              <MainNavigator />
            </View>
            <StatusBar style="dark" animated={true} />
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
