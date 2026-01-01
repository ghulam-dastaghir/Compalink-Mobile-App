import type { ImageSourcePropType } from "react-native";

export const IMAGES = {
  AppleIcon: require("./Apple.png") as ImageSourcePropType,
  FacebookIcon: require("./Facebook.png") as ImageSourcePropType,
  GoogleIcon: require("./Google.png") as ImageSourcePropType,
} as const;
