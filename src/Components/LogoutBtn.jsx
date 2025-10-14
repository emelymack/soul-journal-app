import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/slices/authSlice";
import { lightTheme } from "../global/theme";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
     Alert.alert('👁️ Are you sure you want to leave?', "Don't worry, you can log back anytime 😉", [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(clearUser())},
    ]);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogout} style={{'position': 'relative'}}>
        <AntDesign 
          name="logout" 
          size={22} 
          color={lightTheme.textPrimary}
        />
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
    opacity: 0.8
  }
});
