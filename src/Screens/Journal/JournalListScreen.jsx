import { FlatList, Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/customText/CustomText";
import JournalListCard from "../../components/journal/JournalListCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useSelector } from "react-redux";
import { useGetEntriesQuery } from "../../services/journalApi";
import Loader from "../../components/Loader";
import { lightTheme } from "../../global/theme";

const JournalListScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.auth.user?.userId);

  const {
    data: journalEntries,
    isLoading,
    isError,
    error,
  } = useGetEntriesQuery(userId);

  if (isLoading || !journalEntries) {
    return <Loader />;
  }

  if (isError) {
    return <CustomText>Error: {error.message}</CustomText>;
  }

  const renderEntryItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("Journal Entry", { entryId: item.id, entryTitle: item.title, entryDate: item.date })
      }
    >
      <JournalListCard
        title={item.title}
        text={item.text}
        date={item.date}
        image={item.image}
        location={item.location}
      />
    </Pressable>
  );

  return (
    <View>
      <ButtonPrimary
        onPress={() => navigation.navigate("New Journal Entry")}
        width={"95%"}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome6
            name="plus"
            size={18}
            color={lightTheme.textPrimary}
            style={{ marginRight: 8 }}
          />
          <CustomText size={15} weight={"bold"}>
            New Entry
          </CustomText>
        </View>
      </ButtonPrimary>
      <FlatList
        data={journalEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEntryItem}
        ListEmptyComponent={() => (
          <CustomText size={15} style={{ marginTop: 30, textAlign: "center" }}>
            No journal entries found...
          </CustomText>
        )}
      />
    </View>
  );
};

export default JournalListScreen;

const styles = StyleSheet.create({});
