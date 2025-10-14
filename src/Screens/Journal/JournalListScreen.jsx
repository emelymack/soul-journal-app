import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import CustomText from "../../components/customText/CustomText";
import JournalListCard from "../../components/journal/JournalListCard";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ButtonPrimary from "../../components/ButtonPrimary";
import { useSelector } from "react-redux";
import { useGetEntriesQuery } from "../../services/journalApi";
import Loader from "../../components/Loader";
import { lightTheme } from "../../global/theme";

const JournalListScreen = () => {
  const userId = useSelector((state) => state.auth.user?.userId);

  const {
    data: journalEntries,
    isLoading,
    isError,
    error,
  } = useGetEntriesQuery(userId);

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <CustomText>Error: {error.message}</CustomText>;
  }

  // console.log(journalEntries);

  return (
    <View>
      <ButtonPrimary onPress={() => alert("Button Pressed!")} width={"95%"}>
        <FontAwesome6 name="plus" size={18} color={lightTheme.textPrimary} style={{ marginRight: 8 }} />
        <CustomText size={15} weight={"bold"}>
          New Entry
        </CustomText>
      </ButtonPrimary>
      <FlatList
        data={journalEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JournalListCard
            text={item.text}
            date={item.date}
            image={item.image}
            location={item.location}
          />
        )}
        ListEmptyComponent={() => (
          <CustomText size={15} style={{ marginTop: 30 }}>
            No journal entries found...
          </CustomText>
        )}
      />
    </View>
  );
};

export default JournalListScreen;

const styles = StyleSheet.create({});
