import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "../customText/CustomText";
import { useMemo, useState } from "react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { getStyles } from "./CategoryPicker.style";

const CategoryPicker = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  placeholder = "Select your mood",
}) => {
  const theme = useThemeColors();
  const { styles } = useMemo(() => getStyles(theme), [theme])

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
