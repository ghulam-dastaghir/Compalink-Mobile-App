import type { ImageSourcePropType } from "react-native";

export const IMAGES = {
  AppleIcon: require("./Apple.png") as ImageSourcePropType,
  FacebookIcon: require("./Facebook.png") as ImageSourcePropType,
  GoogleIcon: require("./Google.png") as ImageSourcePropType,
  CompalinkIcon: require("./compalink.png") as ImageSourcePropType,
  LogoIcon: require("./logo.png") as ImageSourcePropType,
  Mobile: require("./mobile.png") as ImageSourcePropType,
  Electronics: require("./electronics.png") as ImageSourcePropType,
  Gadgets: require("./mouse.png") as ImageSourcePropType,
  Bikes: require("./bike.png") as ImageSourcePropType,
  Notebooks: require("./notebook.png") as ImageSourcePropType,
  HeadPhone: require("./headphone.png") as ImageSourcePropType,
  Machine: require("./machine.png") as ImageSourcePropType,
  Wireless: require("./wireless.png") as ImageSourcePropType,
  New1: require("./New1.png") as ImageSourcePropType,
  New2: require("./New2.png") as ImageSourcePropType,
  New3: require("./New3.png") as ImageSourcePropType,
} as const;
