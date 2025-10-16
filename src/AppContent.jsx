import { StatusBar, StyleSheet, View } from "react-native";
import { useThemeColors } from "./hooks/useThemeColors";
import MainNavigator from "./navigation/MainNavigator";

export default function AppContent() {
  const theme = useThemeColors();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });

  const statusBarStyle = theme.mode === 'dark' ? 'light' : 'dark';

  return (
    <View style={styles.container}>
      <MainNavigator />
      <StatusBar style={statusBarStyle} animated={true} />
    </View>
  );
}