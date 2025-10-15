import { Image, ScrollView, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import {
  selectEnrichedEntryById,
  useGetCategoriesQuery,
  useGetEntryByIdQuery,
} from "../../services/journalApi";
import Loader from "../../components/Loader";
import CustomText from "../../components/customText/CustomText";
import { lightTheme } from "../../global/theme";
import Markdown from "react-native-markdown-display";
import { useMemo } from "react";

const EntryScreen = ({ route }) => {
  const userId = useSelector((state) => state.auth.user?.userId);
  const entryId = route.params?.entryId;

  const { isLoading, error } = useGetEntryByIdQuery(
    { userId, entryId },
    {
      skip: !userId || !entryId,
    }
  );
  useGetCategoriesQuery();  

  const selectorArgs = useMemo(() => ({
      userId,
      entryId,
    }), [userId, entryId]
  );

  const enrichedEntry = useSelector((state) =>
    userId && entryId ? selectEnrichedEntryById(state, selectorArgs) : null
  );

  if (isLoading || !enrichedEntry) return <Loader />;
  if (error) return <CustomText>Error: {error.message}</CustomText>;  

  return (
    <ScrollView style={styles.container}>
      {enrichedEntry.location && (
        <View style={[styles.locationTag]}>
          <Ionicons
            name="location-outline"
            size={18}
            color={lightTheme.textPrimary}
            style={{ marginRight: 4 }}
          />
          <CustomText weight={"semibold"}>{enrichedEntry.location}</CustomText>
        </View>
      )}
      {enrichedEntry.image && (
        <View style={[styles.card, styles.imgCard]}>
          <Image
            style={styles.image}
            source={{
              uri: `${enrichedEntry.image}`,
            }}
          />
        </View>
      )}
      <View style={[styles.card, styles.txtCard]}>
        <Markdown>{enrichedEntry.text || ''}</Markdown>
      </View>
    </ScrollView>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.background,
  },
  card: {
    backgroundColor: lightTheme.background,
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
  locationTag: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: lightTheme.border,
    backgroundColor: lightTheme.background,
    borderRadius: 6,
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 10,
    alignSelf: "flex-start",
  },
});
