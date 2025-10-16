import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/slices/authSlice";
import { clearSession } from "../db";
import { useThemeColors } from "../hooks/useThemeColors";

const LogoutBtn = () => {
  const theme = useThemeColors();
  const dispatch = useDispatch();

  const handleClearSession = async () => {
    try {
      await clearSession();
      console.log("Session cleared successfully");
    } catch (error) {
      console.error(
        "There has been an error trying to clear user session: ",
        error
      );
    }

    dispatch(clearUser());
  };

  const handleLogout = () => {
    Alert.alert(
      "👁️ Are you sure you want to leave?",
      "Don't worry! You can log back anytime 😉",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => handleClearSession() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogout} style={{ position: "relative" }}>
        <MaterialIcons name="logout" size={22} color={theme.textPrimary} />
      </Pressable>
    </View>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    right: 15,
    opacity: 0.8,
  },
});
