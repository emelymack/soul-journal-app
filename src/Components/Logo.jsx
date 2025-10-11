import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { lightTheme } from "../global/theme";

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <MaterialCommunityIcons
        name="flower-outline"
        size={30}
        color={lightTheme.textPrimary}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: lightTheme.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    borderRadius: "50%",
    width: 70,
  },
});
