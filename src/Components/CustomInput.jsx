import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "./customText/CustomText";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { lightTheme } from "../global/theme";

const CustomInput = ({
  name,
  onChange,
  value,
  placeholder,
  keyboardType,
  secureTextEntry,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

  return (
    <View style={styles.container}>
      <CustomText>{name}</CustomText>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType || "text"}
          secureTextEntry={secureTextEntry ? !isPasswordVisible : false}
        />
        {secureTextEntry && (
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
      </View>
    </View>
  );
};

export default CustomInput;

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
    marginTop: 2,
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
