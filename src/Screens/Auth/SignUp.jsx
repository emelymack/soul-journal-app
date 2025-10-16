import { Alert, Pressable, StyleSheet, View } from "react-native";
import FlatCard from "../../components/FlatCard";
import CustomText from "../../components/customText/CustomText";
import Logo from "../../components/Logo";
import InputForm from "../../components/InputForm/InputForm";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useEffect, useState } from "react";
import { useSignUpMutation } from "../../services/authApi";
import { signUpSchema } from "../../validations/signUpSchema";
import { useThemeColors } from "../../hooks/useThemeColors";

const SignUp = ({ navigation, route }) => {
    const theme = useThemeColors();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errorFullName, setErrorFullName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorPasswordConfirmation, setErrorPasswordConfirmation] =
    useState(null);

  const [triggerSignUp, result] = useSignUpMutation();

  const onSubmit = () => {
    setErrorFullName(null);
    setErrorEmail(null);
    setErrorPassword(null);
    setErrorPasswordConfirmation(null);

    try {
      signUpSchema.validateSync({
        fullName,
        email,
        password,
        passwordConfirmation,
      });

      triggerSignUp({ fullName, email, password, passwordConfirmation });
    } catch (error) {
      switch (error.path) {
        case "fullName":
          setErrorFullName(error.message);
          break;
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        case "passwordConfirmation":
          setErrorPasswordConfirmation(error.message);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (result.isSuccess) {
      try {
        Alert.alert(
          "🎉 Woohoo!",
          "Registration successful! 💜\nNow you may login.",
          [{ text: "Ok" }]
        );
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
    if (result.isError) {
      Alert.alert(
        "❌ Oops...",
        "There has been an error during your registration.\nPlease, try again.",
        [{ text: "Ok" }]
      );
    }
  }, [result]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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
          error={errorFullName}
        />

        <InputForm
          name="Email"
          onChange={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          error={errorEmail}
        />

        <InputForm
          name="Password"
          onChange={(text) => setPassword(text)}
          value={password}
          placeholder={"Enter your password"}
          isSecure={true}
          error={errorPassword}
        />

        <InputForm
          name="Confirm Password"
          onChange={(text) => setPasswordConfirmation(text)}
          value={passwordConfirmation}
          placeholder={"Confirm your password"}
          isSecure={true}
          error={errorPasswordConfirmation}
        />

        <ButtonPrimary
          onPress={onSubmit}
          style={{ width: "100%", marginTop: 15 }}
          backgroundColor={theme.primary}
        >
          <CustomText>Create Account</CustomText>
        </ButtonPrimary>

        <View style={styles.footerContainer}>
          <CustomText size={13} style={{ marginRight: 5 }}>
            Already have an account?
          </CustomText>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <CustomText size={14} weight="semibold" color={"primary"}>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
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
