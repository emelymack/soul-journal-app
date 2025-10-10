import { Text, StyleSheet, View } from "react-native";
import { lightTheme } from "../global/theme";

const FlatCard = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default FlatCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.backgroundSecondary,
    padding: 16,
    margin: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
});
