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
import Markdown from "react-native-markdown-display";
import { useMemo } from "react";
import CategoryTag from "../../components/CategoryTag";
import { useThemeColors } from "../../hooks/useThemeColors";

const EntryScreen = ({ route }) => {
  const theme = useThemeColors();
  const userId = useSelector((state) => state.auth.user?.userId);
  const entryId = route.params?.entryId;

  const { isLoading, error } = useGetEntryByIdQuery(
    { userId, entryId },
    {
      skip: !userId || !entryId,
    }
  );
  useGetCategoriesQuery();

  const selectorArgs = useMemo(
    () => ({
      userId,
      entryId,
    }),
    [userId, entryId]
  );

  const entry = useSelector((state) =>
    userId && entryId ? selectEnrichedEntryById(state, selectorArgs) : null
  );

  if (isLoading || !entry) return <Loader />;
  if (error) return <CustomText>Error: {error.message}</CustomText>;

  const styles = StyleSheet.create({
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
  });

  const markdownStyles = StyleSheet.create({
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
      color: theme.secondary,
      fontSize: 24,
      marginTop: 2,
      marginBottom: 5,
      fontWeight: 'bold'
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.entryTags}>
        <CategoryTag category={entry.category} />
        {entry.location && (
          <View style={[styles.locationTag]}>
            <Ionicons
              name="location-outline"
              size={18}
              color={theme.textPrimary}
              style={{ marginRight: 4 }}
            />
            <CustomText weight={"semibold"}>{entry.location}</CustomText>
          </View>
        )}
      </View>
      {entry.image && (
        <View style={[styles.card, styles.imgCard]}>
          <Image
            style={styles.image}
            source={{
              uri: `${entry.image}`,
            }}
          />
        </View>
      )}
      <View style={[styles.card, styles.txtCard]}>
        <Markdown style={markdownStyles}>
          {entry.text || ""}
        </Markdown>
      </View>
    </ScrollView>
  );
};

export default EntryScreen;
