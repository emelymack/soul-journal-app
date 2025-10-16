import { StyleSheet } from "react-native";

export const getStyles = (theme) => {
  console.log(theme);
  
  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.background,
      },
      card: {
        backgroundColor: theme.backgroundSecondary,
        padding: 12,
        elevation: 10,
        borderRadius: 10,
        marginHorizontal: 16,
      },
      imgCard: {
        marginVertical: 12,
      },
      image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
      },
      txtCard: {
        marginBottom: 20,
      },
      markdownStyle: {
        body: {
          color: theme.textPrimary,
        },
      },
      entryTags: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "flex-end",
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 6,
      },
      locationTag: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.background,
        borderRadius: 6,
        paddingVertical: 4,
        paddingLeft: 6,
        paddingRight: 10,
        alignSelf: "flex-start",
      },
    }),
    markdownStyles: StyleSheet.create({
      body: {
        color: theme.textPrimary,
        fontSize: 14,
      },
      strong: {
        color: theme.accent,
        fontWeight: "bold",
      },
      em: {
        color: theme.textSecondary,
        fontStyle: "italic",
      },
      heading1: {
        color: theme.mode === 'light' ? theme.primary : theme.secondary,
        fontSize: 24,
        marginTop: 2,
        marginBottom: 5,
        fontWeight: "bold",
      },
    }),
  };
};
