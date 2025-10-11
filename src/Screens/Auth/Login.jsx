import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import FlatCard from "../../components/FlatCard";
import { lightTheme } from "../../global/theme";
import CustomText from "../../components/customText/CustomText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import CustomInput from "../../components/CustomInput";

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <CustomInput
          name="Email"
          onChange={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <CustomInput 
          name="Password"
          onChange={(text) => setPassword(text)}
          value={password}
          placeholder={"Enter your password"}
          secureTextEntry={true}
        />

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
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
  },
});
