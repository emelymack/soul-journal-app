import { ActivityIndicator, StyleSheet, View } from "react-native";
import { lightTheme } from "../global/theme";
import { useThemeColors } from "../hooks/useThemeColors";

const Loader = () => {
  const theme = useThemeColors();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.background
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.secondary} />
    </View>
  );
};

export default Loader;
