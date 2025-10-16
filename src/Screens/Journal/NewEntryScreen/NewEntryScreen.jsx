import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import InputForm from "../../../components/InputForm/InputForm";
import {
  useAddEntryMutation,
  useGetCategoriesQuery,
} from "../../../services/journalApi";
import Loader from "../../../components/Loader";
import CategoryPicker from "../../../components/CategoryPicker/CategoryPicker";
import FlatCard from "../../../components/FlatCard";
import CustomText from "../../../components/customText/CustomText";
import Feather from "@expo/vector-icons/Feather";
import ButtonPrimary from "../../../components/ButtonPrimary";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { getStyles } from "./NewEntryScreen.style";

const NewEntryScreen = ({ navigation }) => {
  const theme = useThemeColors();
    const { styles } = useMemo(() => getStyles(theme), [theme])

  const userId = useSelector((state) => state.auth.user.userId);
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const [addEntry, { isLoading: isSaving }] = useAddEntryMutation();

  const [title, setTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [entryImage, setEntryImage] = useState(null);

  const categoriesList = useMemo(() => {
    if (!categoriesData) return [];
    return categoriesData.filter(Boolean);
  }, [categoriesData]);

  if (isLoading) {
    return <Loader />;
  }

  const isFormValid = !!title && !!selectedCategory && !!entryText;

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to give camera access permission."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      await saveImageAndUpdate(result.assets[0]);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to provide gallery access permission."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      await saveImageAndUpdate(result.assets[0]);
    }
  };

  const saveImageAndUpdate = async (asset) => {
    try {
      const imgBase64 = `data:image/jpeg;base64,${asset.base64}`;
      setEntryImage(imgBase64);
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "There was an error trying to save your photo.");
    }
  };

  const handleAddPhoto = () => {
    Alert.alert("Add your fav memory!", "Choose one option", [
      { text: "📸 Take a picture", onPress: takePhoto },
      { text: "🖼️ Choose from gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSaveEntry = async () => {
    if (!isFormValid) {
      Alert.alert(
        "Incomplete fields",
        "Please, complete your Title, Mood and Thoughts 🤗"
      );
      return;
    }

    const entryData = {
      title: title,
      text: entryText,
      categoryId: selectedCategory.id,
      date: new Date().toISOString(),
      image: entryImage,
      location: null,
    };

    try {
      await addEntry({ userId, entryData }).unwrap();

      Alert.alert(
        "Saved!",
        "A precious moment of reflection, beautifully captured. Thank you for honoring your present 💫"
      );
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save the entry: ", error);
      Alert.alert("Error", "We could not save your entry. Please, try again.");
    }
  };

  useEffect(() => {}, [entryImage, isFormValid, isSaving]);

  return (
    <ScrollView style={styles.container}>
      <InputForm
        name="Title"
        onChange={(text) => setTitle(text)}
        value={title}
        placeholder="What's on your mind?"
      />

      <CategoryPicker
        categories={categoriesList}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        placeholder="Select your mood"
      />

      <InputForm
        name="Your thoughts"
        onChange={(text) => setEntryText(text)}
        value={entryText}
        placeholder={`💭 Write about your day, thoughts, feelings...\n💜 What are you grateful for today? \n\np.s. you can use Markdown format to personalize your entries!\n\nSome examples of what you can do:\n# Heading 1\n## Heading 2\n**bold**\n_italics_\n~strikethrough~`}
        multiline={true}
        numberOfLines={14}
      />

      <FlatCard style={{ marginHorizontal: 0, elevation: 2 }}>
        <CustomText style={styles.extrasTitle}>
          Want to add a memory?
        </CustomText>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={handleAddPhoto} style={styles.extraButton}>
            <Feather name="camera" size={20} color={theme.textSecondary} />
            <CustomText style={{ marginTop: 5 }}>Add Photo</CustomText>
          </Pressable>
        </View>
        {entryImage && (
          <Image
            style={styles.entryImage}
            source={{
              uri: entryImage,
            }}
          />
        )}
      </FlatCard>

      <ButtonPrimary
        onPress={handleSaveEntry}
        style={styles.submitBtn}
        disabled={!isFormValid || isSaving}
      >
        <Feather name="save" size={20} style={{ marginRight: 6 }} />
        <CustomText weight={"semibold"} size={15}>
          Save Entry
        </CustomText>
      </ButtonPrimary>
    </ScrollView>
  );
};

export default NewEntryScreen;
