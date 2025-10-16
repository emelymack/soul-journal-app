import { useSelector } from "react-redux"
import { lightTheme, darkTheme } from "../global/theme";

export const useThemeColors = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return theme;
}