import { Image, ScrollView, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import {
  selectEnrichedEntryById,
  useGetCategoriesQuery,
  useGetEntryByIdQuery,
} from "../../../services/journalApi";
import Loader from "../../../components/Loader";
import CustomText from "../../../components/customText/CustomText";
import Markdown from "react-native-markdown-display";
import { useMemo } from "react";
import CategoryTag from "../../../components/CategoryTag";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { getStyles } from "./EntryScreen.styles";

const EntryScreen = ({ route }) => {
  const theme = useThemeColors();
  const { styles, markdownStyles } = useMemo(() => getStyles(theme), [theme])

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
