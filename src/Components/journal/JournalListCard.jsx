import { Platform, StyleSheet, View } from "react-native";
import CustomText from "../customText/CustomText";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import CategoryTag from "../CategoryTag";
import { useThemeColors } from "../../hooks/useThemeColors";

const JournalListCard = ({ date, title, text, image, location, category }) => {
  const theme = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundSecondary, borderColor: theme.border }]}>
      <View style={styles.header}>
        <View style={styles.headerItems}>
          <Feather name="calendar" size={14} color={theme.textSecondary} />
          <CustomText
            color={theme.textSecondary}
            size={11}
            style={{ marginLeft: 4 }}
          >
            {format(date, "MMM d, yyyy")}
          </CustomText>
        </View>
        <View style={styles.headerItems}>
          {image && (
            <Feather name="camera" size={14} color={theme.textSecondary} />
          )}
          {location && (
            <Ionicons
              name="location-outline"
              size={14}
              color={theme.textSecondary}
              style={{ marginLeft: 4 }}
            />
          )}
        </View>
      </View>
      <CustomText type={"title"} size={15} style={{ marginBottom: 4 }}>
        {title}
      </CustomText>
      <CustomText size={12} style={{ marginBottom: 8 }}>
        {text?.length > 250 ? `${text?.substring(0, 250)}...` : text}
      </CustomText>
      <View style={{ alignSelf: "flex-end" }}>
        <CategoryTag category={category} />
      </View>
    </View>
  );
};

export default JournalListCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "white",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerItems: {
    flexDirection: "row",
    alignItems: "center",
  },
});
