import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View, Button, Pressable } from "react-native";
import RootLayout from "@/components/layout/RootLayout";
import Header from "./src/components/Header";
import JournalListScreen from "./src/screens/Journal/JournalListScreen";
import { lightTheme } from "./src/global/theme";
import CustomText from "./src/components/customText/CustomText";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
  return (
    <RootLayout>
      <ScrollView>
        <View style={styles.container}>
          <Header title={"Journal Entries"} />
          <Pressable
            onPress={() => alert("Button Pressed!")}
            style={styles.button}
          >
            <AntDesign name="plus" size={14} style={{ marginRight: 6 }} />
            <CustomText size={14}>New Entry</CustomText>
          </Pressable>
          <JournalListScreen />
          <StatusBar style="dark" />
        </View>
      </ScrollView>
    </RootLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: '95%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: lightTheme.accent,
    elevation: 4,
  },
});
