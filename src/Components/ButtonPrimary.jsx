import { Pressable, StyleSheet } from "react-native";
import { lightTheme } from "../global/theme";

const ButtonPrimary = ({ children, backgroundColor, style }) => {
  return (
    <Pressable 
      onPress={() => alert("Button Pressed!")} 
      style={[
        styles.button,
        {backgroundColor: backgroundColor || lightTheme.accent},
        style
      ]}
    >
      {children}
    </Pressable>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 4,
  }
});
