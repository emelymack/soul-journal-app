import { StyleSheet, Text, View } from "react-native";
import { lightTheme } from "../global/theme";
import CustomText from "./customText/CustomText";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <CustomText type="title" weight="bold" size={24}>
        {title}
      </CustomText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: "100%",
    padding: 30,
    backgroundColor: lightTheme.backgroundSecondary,
    justifyContent: "center",
    // alignItems: "center",
  },
});
