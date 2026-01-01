import React, { memo } from 'react';
import { TextStyle } from 'react-native';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import { Colors } from '../constants/colors';

// Icon family types
export type IconFamily =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

interface CustomIconProps {
  family?: IconFamily;
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
  onPress?: () => void;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  family = 'Ionicons',
  name,
  size = 24,
  color = Colors.icon,
  style,
  onPress,
}) => {
  const iconProps = {
    name: name as any,
    size,
    color,
    style,
    onPress,
  };

  switch (family) {
    case 'AntDesign':
      return <AntDesign {...iconProps} />;
    case 'Entypo':
      return <Entypo {...iconProps} />;
    case 'EvilIcons':
      return <EvilIcons {...iconProps} />;
    case 'Feather':
      return <Feather {...iconProps} />;
    case 'FontAwesome':
      return <FontAwesome {...iconProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...iconProps} />;
    case 'FontAwesome6':
      return <FontAwesome6 {...iconProps} />;
    case 'Fontisto':
      return <Fontisto {...iconProps} />;
    case 'Foundation':
      return <Foundation {...iconProps} />;
    case 'Ionicons':
      return <Ionicons {...iconProps} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'MaterialIcons':
      return <MaterialIcons {...iconProps} />;
    case 'Octicons':
      return <Octicons {...iconProps} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons {...iconProps} />;
    case 'Zocial':
      return <Zocial {...iconProps} />;
    default:
      return <Ionicons {...iconProps} />;
  }
};

export default memo(CustomIcon);

