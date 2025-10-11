import { Pressable, StyleSheet, View } from "react-native";
import { lightTheme } from "../../global/theme";
import FlatCard from "../../components/FlatCard";
import CustomText from "../../components/customText/CustomText";
import Logo from "../../components/Logo";
import InputForm from "../../components/InputForm";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useState } from "react";

const SignUp = ({ navigation, route }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <View style={styles.container}>
      <FlatCard style={styles.card}>
        <Logo />
        <CustomText type={"title"} size={18}>
          Join Soul Journal
        </CustomText>
        <CustomText size={12} style={{ marginTop: 8, textAlign: "center" }}>
          Start your journey of mindfulness and self-reflection
        </CustomText>

        <InputForm
          name="Full Name"
          onChange={(text) => setFullName(text)}
          value={fullName}
          placeholder="Enter your name"
        />

        <InputForm
          name="Email"
          onChange={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <InputForm
          name="Password"
          onChange={(text) => setPassword(text)}
          value={password}
          placeholder={"Enter your password"}
          isSecure={true}
        />

        <InputForm
          name="Confirm Password"
          onChange={(text) => setPasswordConfirmation(text)}
          value={passwordConfirmation}
          placeholder={"Confirm your password"}
          isSecure={true}
        />

        <ButtonPrimary
          style={{ width: "100%", marginTop: 15 }}
          backgroundColor={lightTheme.primary}
        >
          <CustomText>Create Account</CustomText>
        </ButtonPrimary>

        <View style={styles.footerContainer}>
          <CustomText size={12} style={{ marginRight: 3 }}>
            Already have an account?
          </CustomText>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <CustomText size={12} weight="bold" color={"primary"}>
              Sign in
            </CustomText>
          </Pressable>
        </View>
      </FlatCard>
    </View>
  );
};

export default SignUp;

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
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
});
