import { StyleSheet } from "react-native";

export const getStyles = (theme) => {
  return {
    styles: StyleSheet.create({
      container: {
        width: "100%",
        marginTop: 20,
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderColor: theme.border,
        padding: 10,
        marginTop: 4,
        backgroundColor: theme.backgroundSecondary,
        color: theme.textPrimary,
        borderRadius: 5,
      },
      inputWrapper: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
      },
      focused: {
        borderColor: theme.accent,
        borderWidth: 1.5,
        elevation: 5,
      },
      passwordEye: {
        position: "absolute",
        right: 12,
        bottom: 10,
        opacity: 0.65,
      },
    }),
  };
};
