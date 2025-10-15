import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { lightTheme } from "../global/theme";
import { useNavigation } from "@react-navigation/native";

const BackBtn = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={22} color={lightTheme.textPrimary} />
    </Pressable>
  );
};

export default BackBtn;

const styles = StyleSheet.create({});
