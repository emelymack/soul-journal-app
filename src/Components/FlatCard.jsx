import { Text, StyleSheet, View } from "react-native";
import { lightTheme } from "../global/theme";

const FlatCard = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default FlatCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.background,
    padding: 16,
    margin: 16,
    elevation: 10
  },
});
