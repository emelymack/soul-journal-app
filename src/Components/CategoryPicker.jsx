import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./customText/CustomText";
import { useState } from "react";
import { useThemeColors } from "../hooks/useThemeColors";

const CategoryPicker = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  placeholder = "Select your mood",
}) => {
  const theme = useThemeColors();
  const [modalVisible, setModalVisible] = useState(false);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        onSelectCategory(item);
        setModalVisible(false);
      }}
    >
      <CustomText style={{ fontSize: 16 }}>
        {item.emoji} {item.name}
      </CustomText>
      {selectedCategory?.id === item.id && (
        <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
      )}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      marginTop: 20,
    },
    pickerButton: {
      height: 40,
      marginTop: 4,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 5,
      backgroundColor: theme.backgroundSecondary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
    },
    selectedText: {
      color: theme.textPrimary,
    },
    placeholderText: {
      color: theme.textSecondary,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      margin: 20,
      width: "80%",
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    option: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <CustomText>How are you feeling?</CustomText>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedCategory ? (
          <CustomText style={styles.selectedText}>
            {selectedCategory.emoji} {selectedCategory.name}
          </CustomText>
        ) : (
          <CustomText style={styles.placeholderText}>{placeholder}</CustomText>
        )}
        <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <CustomText style={styles.modalTitle}>
              What's your mood today?
            </CustomText>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CategoryPicker;
