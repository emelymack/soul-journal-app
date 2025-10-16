import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "./customText/CustomText";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../global/theme";
import { useThemeColors } from "../hooks/useThemeColors";

const InputForm = ({
  name,
  onChange,
  value,
  placeholder,
  keyboardType,
  isSecure,
  error,
  multiline,
  numberOfLines = 1,
}) => {
    const theme = useThemeColors();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      marginTop: 20,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 10,
      marginTop: 4,
      backgroundColor: theme.backgroundSecondary,
      color: theme.textPrimary,
      borderRadius: 5,
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    focused: {
      borderColor: theme.accent,
      borderWidth: 1.5,
      elevation: 5,
    },
    passwordEye: {
      position: "absolute",
      right: 12,
      bottom: 10,
      opacity: 0.65,
    },
  });

  return (
    <View style={styles.container}>
      <CustomText>{name}</CustomText>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            multiline && {
              height: 18 * numberOfLines,
              textAlignVertical: "top",
              paddingTop: 10,
            },
            isFocused && styles.focused,
          ]}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType || "text"}
          secureTextEntry={isSecure ? !isPasswordVisible : false}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.textSecondary}
        />
        {isSecure && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.passwordEye}
          >
            {isPasswordVisible ? (
              <AntDesign name="eye-invisible" size={18} color={theme.textPrimary} />
            ) : (
              <Feather name="eye" size={18} color={theme.textPrimary} />
            )}
          </TouchableOpacity>
        )}
        {error && (
          <CustomText color={"error"} size={10}>
            {error}
          </CustomText>
        )}
      </View>
    </View>
  );
};

export default InputForm;
