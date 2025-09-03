import { Text } from "react-native"
import { setFontFamily } from "@/utils/fontFamily";
import { lightTheme } from "../../global/theme";

const CustomText = ({ type, children, style, weight, italic, size, color }) => {

  return (
    <Text
      style={[
        {
          fontFamily: setFontFamily({ font: type === "title" ? "PlayfairDisplay" : "Nunito", weight, italic }),
          fontSize: size,
          color: lightTheme[color] || lightTheme.textPrimary
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
