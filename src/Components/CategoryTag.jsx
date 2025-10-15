import { StyleSheet, Text, View } from "react-native";
import CustomText from "./customText/CustomText";
import { lightTheme } from "../global/theme";

const CategoryTag = ({ category }) => {
  const { name, emoji } = category

  return (
    <View style={styles.categoryContainer}>
      {emoji && <CustomText>{emoji}</CustomText>}
      <CustomText
        size={11}
        weight={"semibold"}
        style={emoji && { marginLeft: 5 }}
      >
        {name}
      </CustomText>
    </View>
  );
};

export default CategoryTag;

const styles = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightTheme.secondary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6
  },
});
