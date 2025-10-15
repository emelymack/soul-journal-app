import { Alert, Pressable, StyleSheet, Switch, View } from "react-native";
import FlatCard from "../../components/FlatCard";
import { lightTheme } from "../../global/theme";
import CustomText from "../../components/customText/CustomText";
import { useEffect, useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputForm from "../../components/InputForm";
import Logo from "../../components/Logo";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { loginSchema } from "../../validations/loginSchema";
import { setUser } from "../../store/slices/authSlice";
import { clearSession, saveSession } from "../../db";

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const [triggerLogin, { data, isSuccess, isError, error }] =
    useLoginMutation();
  const [persistSession, setPersistSession] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    setErrorEmail(null);
    setErrorPassword(null);

    try {
      loginSchema.validateSync({ email, password });

      triggerLogin({ email, password });
    } catch (error) {
      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const saveLoginSession = async () => {
      if (isSuccess) {
        try {
          dispatch(setUser(data));

          const { token } = data.idToken;
          if (persistSession) {
            await saveSession(token);
          } else {
            await clearSession(token);
          }
        } catch (error) {
          console.log("Error logging session: ", error);
        }
      }
    };
    if (isError) {
      Alert.alert(
        "❌ Oops...",
        "Invalid email or password.\nPlease, try again.",
        [{ text: "Ok" }]
      );
    }

    saveLoginSession();
  }, [data, isSuccess, isError, error]);

  return (
    <View style={styles.container}>
      <FlatCard style={styles.card}>
        <Logo />
        <CustomText type={"title"} size={18}>
          Welcome Back
        </CustomText>
        <CustomText size={12} style={{ marginTop: 8 }}>
          Sign in to continue your mindful journey
        </CustomText>

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

        <ButtonPrimary
          onPress={handleLogin}
          style={{ width: "100%", marginTop: 15 }}
          backgroundColor={lightTheme.primary}
        >
          <CustomText>Sign In</CustomText>
        </ButtonPrimary>
        <View style={styles.persistSessionContainer}>
          <CustomText>Stay logged in?</CustomText>
          <Switch
            onValueChange={() => setPersistSession(!persistSession)}
            value={persistSession}
            trackColor={{ false: "#767577", true: lightTheme.accent }}
            thumbColor={persistSession ? lightTheme.secondary : "#efeef1ff"}
          />
        </View>

        <View style={styles.footerContainer}>
          <CustomText size={12} style={{ marginRight: 3 }}>
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
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  persistSessionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
