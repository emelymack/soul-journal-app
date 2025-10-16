import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { lightTheme } from "../../global/theme";
import { useEffect, useMemo, useState } from "react";
import InputForm from "../../components/InputForm";
import {
  useAddEntryMutation,
  useGetCategoriesQuery,
} from "../../services/journalApi";
import Loader from "../../components/Loader";
import CategoryPicker from "../../components/CategoryPicker";
import FlatCard from "../../components/FlatCard";
import CustomText from "../../components/customText/CustomText";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonPrimary from "../../components/ButtonPrimary";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

const NewEntryScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.auth.user.userId);
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const [addEntry, { isLoading: isSaving }] = useAddEntryMutation();

  const [title, setTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [entryImage, setEntryImage] = useState(null);

  const categoriesList = useMemo(() => {
    if (!categoriesData) return [];
    return Object.values(categoriesData);
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
      aspect: [3, 2],
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
      aspect: [3, 2],
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
        placeholder={`💭 Write about your day, thoughts, feelings...\n\n💜 What are you grateful for today? \n\np.s. you can use **bold** o *italics*!`}
        multiline={true}
        numberOfLines={12}
      />

      <FlatCard style={{ marginHorizontal: 0, elevation: 2 }}>
        <CustomText style={styles.extrasTitle}>Add Media & Location</CustomText>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={handleAddPhoto} style={styles.extraButton}>
            <Feather name="camera" size={20} color={lightTheme.textSecondary} />
            <CustomText style={{ marginTop: 5 }}>Add Photo</CustomText>
          </Pressable>
          <Pressable style={styles.extraButton}>
            <Ionicons
              name="location-outline"
              size={20}
              color={lightTheme.textSecondary}
            />
            <CustomText style={{ marginTop: 5 }}>Add Location</CustomText>
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
        // onPress={handleSaveEntry}
        onPress={() => console.log('button pressed')}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.background,
    paddingHorizontal: 12,
  },
  extrasTitle: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: lightTheme.textPrimary,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  extraButton: {
    display: "flex",
    alignItems: "center",
    width: "49%",
    marginTop: 15,
    borderWidth: 1,
    borderColor: lightTheme.border,
    padding: 15,
    borderRadius: 15,
  },
  entryImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 15,
    resizeMode: "cover",
  },
  submitBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 30,
    elevation: 1,
  }
});
