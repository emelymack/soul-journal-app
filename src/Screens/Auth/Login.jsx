import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FlatCard from "../../components/FlatCard";
import { lightTheme } from "../../global/theme";
import CustomText from "../../components/customText/CustomText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import ButtonPrimary from "../../components/ButtonPrimary";

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

  return (
    <View style={styles.container}>
      <FlatCard style={styles.card}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons
            name="flower-outline"
            size={30}
            color={lightTheme.textPrimary}
          />
        </View>
        <CustomText type={"title"} size={18}>
          Welcome Back
        </CustomText>
        <CustomText size={12} style={{ marginTop: 8 }}>
          Sign in to continue your mindful journey
        </CustomText>

        <View style={styles.inputContainer}>
          <CustomText>Email</CustomText>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <CustomText>Password</CustomText>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
            />
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
          </View>
        </View>

        <ButtonPrimary
          style={{ width: "100%", marginTop: 15 }}
          backgroundColor={lightTheme.primary}
        >
          <CustomText>Sign In</CustomText>
        </ButtonPrimary>

        <View style={styles.footerContainer}>
          <CustomText size={12} style={{ marginRight: 3}}>
            Don't have an account?
          </CustomText>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <CustomText size={12} weight="bold" color={"primary"}>
              Sign up
            </CustomText>
          </Pressable>
        </View>
      </FlatCard>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.background,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    borderRadius: 10,
    width: "90%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  logoContainer: {
    backgroundColor: lightTheme.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    borderRadius: "50%",
    width: 70,
  },
  inputContainer: {
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
  passwordInput: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  passwordEye: {
    position: "absolute",
    right: 12,
    opacity: 0.65,
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
  },
});
