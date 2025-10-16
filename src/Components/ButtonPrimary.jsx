import { Pressable, StyleSheet, View } from "react-native";
import { lightTheme } from "../global/theme";

const ButtonPrimary = ({
  children,
  backgroundColor,
  style,
  onPress,
  width,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: backgroundColor || lightTheme.accent,
            width: width || "100%",
          },
          style,
          disabled && styles.disabled
        ]}
        disabled={disabled}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 4,
  },
  disabled: {
    opacity: 0.5,
  }
});
