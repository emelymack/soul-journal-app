import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

const FlatCard = ({ children, style }) => {
  const theme = useThemeColors();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 10,
      padding: 16,
      margin: 16,
      elevation: 10,
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
};

export default FlatCard;
