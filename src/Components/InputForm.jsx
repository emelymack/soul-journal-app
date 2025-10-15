import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "./customText/CustomText";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { lightTheme } from "../global/theme";
import Markdown from "react-native-markdown-display";

const InputForm = ({
  name,
  onChange,
  value,
  placeholder,
  keyboardType,
  isSecure,
  error,
  multiline,
  numberOfLines = 1
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

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
              paddingTop: 10
            },
          ]}
          onChangeText={onChange}
          value={<Markdown>value</Markdown>}
          placeholder={placeholder}
          keyboardType={keyboardType || "text"}
          secureTextEntry={isSecure ? !isPasswordVisible : false}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
        />
        {isSecure && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.passwordEye}
          >
            {isPasswordVisible ? (
              <AntDesign name="eye-invisible" size={18} color="black" />
            ) : (
              <Feather name="eye" size={18} color="black" />
            )}
          </TouchableOpacity>
        )}
        {error && (
          <CustomText 
            color={"error"}
            size={10}
          >
            {error}
          </CustomText>
        )}
      </View>
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: lightTheme.border,
    padding: 10,
    marginTop: 4,
    backgroundColor: lightTheme.backgroundSecondary,
    borderRadius: 5,
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  passwordEye: {
    position: "absolute",
    right: 12,
    opacity: 0.65,
  }
});
