import { StyleSheet, View } from "react-native";
import CustomText from "./customText/CustomText";
import LogoutBtn from "./LogoutBtn";
import BackBtn from "./BackBtn";
import { useThemeColors } from "../hooks/useThemeColors";

const Header = ({ title, children, backBtn, style }) => {
  const theme = useThemeColors();

  return (
    <View style={[style, styles.container, { backgroundColor: theme.backgroundSecondary }]}>
      <View style={styles.backBtnContainer}>{backBtn && <BackBtn />}</View>
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
      minHeight: 120,
      width: "100%",
      padding: 25,
      justifyContent: "center",
      elevation: 10,
    },
    backBtnContainer: {
      position: "absolute",
      top: 15,
      left: 22,
      opacity: 0.8,
    },
  });