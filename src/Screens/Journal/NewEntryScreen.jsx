import { ScrollView, StyleSheet, View } from "react-native";
import { lightTheme } from "../../global/theme";
import { use, useMemo, useState } from "react";
import InputForm from "../../components/InputForm";
import { useGetCategoriesQuery } from "../../services/journalApi";
import Loader from "../../components/Loader";
import CategoryPicker from "../../components/CategoryPicker";

const NewEntryScreen = () => {
  const [title, setTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [errorTitle, setErrorTitle] = useState(null);
  const [errorMood, setErrorMood] = useState(null);
  const [errorEntryText, setErrorEntryText] = useState(null);

  const { data: categoriesData, isLoading } = useGetCategoriesQuery();

  const categoriesList = useMemo(() => {
    if (!categoriesData) return [];
    return Object.values(categoriesData);
  }, [categoriesData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <InputForm
        name="Title"
        onChange={(text) => setTitle(text)}
        value={title}
        placeholder="What's on your mind?"
        error={errorTitle}
      />

      <CategoryPicker
        categories={categoriesList}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        placeholder="¿Cómo te sentiste hoy?"
      />

      <InputForm
        name="Your thoughts"
        onChange={(text) => setEntryText(text)}
        value={entryText}
        placeholder={`💭 Write about your day, thoughts, feelings...\n\n💜 What are you grateful for today? \n\np.s. you can use **bold** o *italics*!`}
        error={errorEntryText}
        multiline={true}
        numberOfLines={12}
      />
    </ScrollView>
  );
};

export default NewEntryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.background,
    marginHorizontal: 12,
  },
});