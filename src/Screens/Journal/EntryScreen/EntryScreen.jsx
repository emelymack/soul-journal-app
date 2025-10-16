import { Alert, Image, Pressable, ScrollView, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";
import {
  selectEnrichedEntryById,
  useDeleteEntryMutation,
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

const EntryScreen = ({ navigation, route }) => {
  const theme = useThemeColors();
  const { styles, markdownStyles } = useMemo(() => getStyles(theme), [theme]);

  const userId = useSelector((state) => state.auth.user?.userId);
  const entryId = route.params?.entryId;
  const [deleteEntry, { isLoading: isSavingDelete }] = useDeleteEntryMutation();

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

  const handleDelete = () => {
    Alert.alert(
      "❗Are you sure you want to delete this entry?",
      "Beware this action is permanent.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteEntry({ userId, entryId }).unwrap();
              navigation.goBack();
            } catch (error) {
              console.error("Failed to delete the entry: ", error);
              Alert.alert( "Error", "We could not delete your entry. Please, try again." );
            }
          },
        },
      ]
    );
  };

  const setActionIconColor = () => {
    return (theme.mode === 'light') ? theme.textSecondary : theme.secondary
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.entryTags}>
        <CategoryTag category={entry.category} />
        <View style={styles.actionsContainer}>
          <Pressable 
            style={styles.actionBtn} 
            onPress={handleDelete}
            disabled={isSavingDelete}
          >
            <Feather 
              name="trash-2" 
              size={22} 
              color={isSavingDelete ? theme.inactive : setActionIconColor()} 
            />
          </Pressable>
        </View>
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
        <Markdown style={markdownStyles}>{entry.text || ""}</Markdown>
      </View>
    </ScrollView>
  );
};

export default EntryScreen;
