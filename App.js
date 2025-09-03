import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RootLayout from "@/components/layout/RootLayout";
import CustomText from "@/components/customText/CustomText";

export default function App() {
  return (
    <RootLayout>
      <View style={styles.container}>
        <CustomText
          type="title"
          weight="semibold"
          size={25}
          color="accent"
          style={{ textAlign: "center"}}
        >
          Open up App.js to start working on your app!
        </CustomText>

        <StatusBar style="auto" />
      </View>
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
});
