import { FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native";
import CustomText from "../../components/customText/CustomText";
import JournalListCard from "../../components/journal/JournalListCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useSelector } from "react-redux";
import {
  selectEnrichedEntries,
  useGetCategoriesQuery,
  useGetEntriesQuery,
} from "../../services/journalApi";
import Loader from "../../components/Loader";
import { useThemeColors } from "../../hooks/useThemeColors";

const JournalListScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const userId = useSelector((state) => state.auth.user?.userId);

  const {
    isLoading: isLoadingEntries,
    error: entriesError,
  } = useGetEntriesQuery(userId);

  const {
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const enrichedEntries = useSelector(selectEnrichedEntries(userId));

  if (isLoadingEntries || isLoadingCategories) {
    return <Loader />;
  }

  if (entriesError || categoriesError) {
    return <CustomText>Error: {error.message}</CustomText>;
  }  

  const renderEntryItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("Journal Entry", {
          entryId: item.id,
          entryTitle: item.title,
          entryDate: item.date
        })
      }
    >
      <JournalListCard
        title={item.title}
        text={item.text}
        date={item.date}
        image={item.image}
        location={item.location}
        category={item.category}
      />
    </Pressable>
  );

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <ButtonPrimary
        onPress={() => navigation.navigate("New Journal Entry")}
        width={"95%"}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome6
            name="plus"
            size={18}
            color={theme.textPrimary}
            style={{ marginRight: 8 }}
          />
          <CustomText size={15} weight={"bold"}>
            New Entry
          </CustomText>
        </View>
      </ButtonPrimary>
      <FlatList
        data={enrichedEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEntryItem}
        contentContainerStyle={{paddingBottom: 100}}
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