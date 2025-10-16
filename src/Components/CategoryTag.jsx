import { StyleSheet, View } from "react-native";
import CustomText from "./customText/CustomText";
import { useThemeColors } from "../hooks/useThemeColors";

const CategoryTag = ({ category }) => {
  const theme = useThemeColors();
  const { name, emoji } = category

  return (
    <View style={[styles.categoryContainer, {backgroundColor: theme.mode === 'light' ? theme.accent : theme.secondary}]}>
      {emoji && <CustomText>{emoji}</CustomText>}
      <CustomText
        size={11}
        weight={"semibold"}
        style={emoji && { marginLeft: 5 }}
        color={theme.mode === 'light' ? 'textSecondary' : 'background'}
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
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6
  },
});
