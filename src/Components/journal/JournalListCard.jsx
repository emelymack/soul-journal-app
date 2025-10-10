import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../customText/CustomText";
import { lightTheme } from "../../global/theme";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";

const JournalListCard = ({ date, text, image, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItems}>
          <Feather name="calendar" size={14} color={lightTheme.textSecondary} />
          <CustomText
            color={"textSecondary"}
            size={11}
            style={{ marginLeft: 4 }}
          >
            {/* cuando la traiga de Firebase:
              const formatDate = date.toDate()
              {date.format(formatDate, 'MMM d, yyyy')} 
            */}
            {format(date, "MMM d, yyyy")}
          </CustomText>
        </View>
        <View style={styles.headerItems}>
          {image && (
            <Feather name="camera" size={14} color={lightTheme.textSecondary} />
          )}
          {location && (
            <Ionicons name="location-outline" size={14} color={lightTheme.textSecondary} style={{ marginLeft: 4 }}
            />
          )}
        </View>
      </View>
      <Pressable>
        <CustomText size={12}>
          {text.length > 250 ? `${text.substring(0, 250)}...` : text}
        </CustomText>
      </Pressable>
    </View>
  );
};

export default JournalListCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    border: `1px solid ${lightTheme.border}`,
    borderRadius: 8,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
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
