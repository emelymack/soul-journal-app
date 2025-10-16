import { StyleSheet } from "react-native";

export const getStyles = (theme) => {
  return {
    styles: StyleSheet.create({
      container: {
        width: "100%",
        marginTop: 20,
      },
      pickerButton: {
        height: 40,
        marginTop: 4,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 5,
        backgroundColor: theme.backgroundSecondary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
      },
      selectedText: {
        color: theme.textPrimary,
      },
      placeholderText: {
        color: theme.textSecondary,
      },
      modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalView: {
        margin: 20,
        width: "80%",
        backgroundColor: theme.backgroundSecondary,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
      },
      option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    }),
  };
};
