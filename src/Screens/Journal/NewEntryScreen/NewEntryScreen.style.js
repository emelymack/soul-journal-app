import { StyleSheet } from "react-native";

export const getStyles = (theme) => {
  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.background,
        paddingHorizontal: 12,
      },
      extrasTitle: {
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.textPrimary,
      },
      buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      extraButton: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginTop: 15,
        borderWidth: 1,
        borderColor: theme.border,
        padding: 15,
        borderRadius: 15,
      },
      entryImage: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginTop: 15,
        resizeMode: "cover",
      },
      submitBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 30,
        elevation: 1,
      },
    }),
  };
};
