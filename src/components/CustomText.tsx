import React, { FC, memo, useMemo } from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '../assets/fonts';
import { Colors } from '../constants/colors';
import { useCustomTextStyle } from '../styles/styles';
import { normalizeSize } from '../utils/normalize';

interface iProps {
  label?: string;
  translationEnabled?: boolean;
  textStyle?: TextStyle;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  numberOfLines?: number;
  disabled?: boolean;
  onLongPress?: () => void;
  color?: string | number;
}

const CustomText: FC<iProps & TextStyle> = ({
  textStyle,
  fontSize,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  alignSelf,
  fontFamily,
  fontStyle,
  textTransform,
  textAlign,
  label,
  color,
  fontWeight,
  bottom,
  width,
  borderColor,
  borderBottomWidth,
  onPress,
  marginVertical,
  paddingBottom,
  top,
  lineHeight,
  containerStyle,
  numberOfLines,
  translationEnabled,
  disabled,
  onLongPress,
}) => {
  const styles = useCustomTextStyle();

  const textStyleMemo = useMemo(
    () => [
      {
        fontSize: normalizeSize(fontSize || 12),
        color: disabled ? Colors.primary : color || Colors.primary,
        marginTop: marginTop || 0,
        marginBottom: marginBottom || 0,
        marginLeft: marginLeft,
        marginRight: marginRight || 0,
        alignSelf: alignSelf || 'flex-start',
        fontFamily: fontFamily || Fonts.Regular,
        fontStyle,
        lineHeight,
        textAlign,
        textTransform,
        fontWeight,
        bottom,
        borderBottomWidth,
        borderColor,
        width,
        marginVertical,
        paddingBottom,
        top,
      },
      textStyle,
    ],
    [
      fontSize,
      disabled,
      color,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      alignSelf,
      fontFamily,
      fontStyle,
      lineHeight,
      textAlign,
      textTransform,
      fontWeight,
      bottom,
      borderBottomWidth,
      borderColor,
      width,
      marginVertical,
      paddingBottom,
      top,
      textStyle,
    ]
  );

  const containerStyleMemo = useMemo(
    () => [styles.mainContainer, containerStyle],
    [styles.mainContainer, containerStyle]
  );

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled || !onPress}
      style={containerStyleMemo}
      onLongPress={onLongPress}
    >
      <Text maxFontSizeMultiplier={1} numberOfLines={numberOfLines} allowFontScaling={false} style={textStyleMemo}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(CustomText);
