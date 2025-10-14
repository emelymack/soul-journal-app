import { StyleSheet, View } from "react-native";
import { lightTheme } from "../global/theme";
import CustomText from "./customText/CustomText";
import LogoutBtn from "./LogoutBtn";

const Header = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <CustomText type="title" weight="bold" size={24}>
        {title}
      </CustomText>
      {children}
      <LogoutBtn />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    padding: 25,
    backgroundColor: lightTheme.backgroundSecondary,
    justifyContent: "center",
  },
});
