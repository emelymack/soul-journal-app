import { StyleSheet, View } from "react-native";
import Header from "../Header";
import Feather from "@expo/vector-icons/Feather";
import CustomText from "../customText/CustomText";
import { format } from "date-fns";
import { lightTheme } from "../../global/theme";

const JournalEntryHeader = ({ title, date }) => {
  return (
    <View>
      <Header title={title} backBtn={true} style={styles.container}>
        <View style={styles.dateContainer}>
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
            {format(date, "MMMM d, yyyy")}
          </CustomText>
        </View>
      </Header>
    </View>
  );
};

export default JournalEntryHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
});
