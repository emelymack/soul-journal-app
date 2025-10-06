export const setFontStyle = ({ font, weight, italic }) => {
  const fontWeight = font;

  if (weight === "bold") {
    return `${fontWeight}-Bold${italic ? "Italic" : ""}`;
  }

  if (weight === "semibold") {
    return `${fontWeight}-SemiBold`;
  }

  if (weight === "medium") {
    return `${fontWeight}-Medium`;
  }

  if (weight === "light") {
    return `${fontWeight}-Light${italic ? "Italic" : ""}`;
  }

  return `${fontWeight}-${italic ? "Italic" : (font === 'Nunito' ? "Regular" : "SemiBold")}`;
};
