import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useThemeColors } from "../hooks/useThemeColors";

const BackBtn = () => {
  const theme = useThemeColors();
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={22} color={theme.textPrimary} />
    </Pressable>
  );
};

export default BackBtn;

const styles = StyleSheet.create({});
