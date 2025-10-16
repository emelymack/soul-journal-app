import { Text } from "react-native"
import { setFontStyle } from "@/utils/fontStyle";
import { useThemeColors } from "../../hooks/useThemeColors";

const CustomText = ({ type, children, style, weight, italic, size, color }) => {
    const theme = useThemeColors();

  return (
    <Text
      style={[
        {
          fontFamily: setFontStyle({ font: type === "title" ? "PlayfairDisplay" : "Nunito", weight, italic }),
          fontSize: size,
          color: theme[color] || theme.textPrimary
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
