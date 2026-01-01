import React, { FC, ReactNode, memo, useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { Fonts } from '../assets/fonts';
import { Colors } from '../constants/colors';
import { normalizeSize } from '../utils/normalize';
import { heightDP } from '../utils/responsive';

interface iProps {
  label: string;
  loading?: boolean;
  onPress?: () => void;
  borderColor?: string;
  disabled?: boolean;
  activityIndicatorColor?: string;
  translationEnabled?: boolean;
  backgroundColor?: string;
  borderWidth?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  lineHeight?: number;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const CustomButton: FC<iProps & TextStyle & StyleProp<ViewStyle>> = ({
  onPress,
  label,
  backgroundColor,
  borderWidth,
  borderColor,
  width,
  height,
  alignSelf,
  borderRadius,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  fontSize,
  color,
  fontFamily,
  loading,
  disabled,
  paddingVertical,
  paddingHorizontal,
  lineHeight,
  icon,
  iconPosition = 'left',
}) => {
  const textStyle = useMemo(
    () => ({
      fontSize: normalizeSize(fontSize || 14),
      color: color || Colors?.white,
      fontFamily: fontFamily || Fonts.Medium,
      lineHeight: lineHeight,
    }),
    [fontSize, color, fontFamily, lineHeight]
  );

  const iconContainerStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      gap: normalizeSize(8),
    }),
    []
  );

  const renderButtonContent = useCallback(() => {
    if (icon) {
      if (iconPosition === 'left') {
        return (
          <View style={iconContainerStyle}>
            {icon}
            <Text style={textStyle}>{label}</Text>
          </View>
        );
      } else {
        return (
          <View style={iconContainerStyle}>
            <Text style={textStyle}>{label}</Text>
            {icon}
          </View>
        );
      }
    }
    return label;
  }, [icon, iconPosition, iconContainerStyle, textStyle, label]);

  const contentStyle = useMemo(
    () => ({
      height: heightDP(height || normalizeSize(56)),
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    }),
    [height]
  );

  const buttonStyle = useMemo(
    () => ({
      backgroundColor: disabled ? Colors?.gray : backgroundColor || Colors?.primary,
      borderWidth: borderWidth,
      borderColor: borderColor || Colors?.gray,
      width: width || '100%',
      alignSelf: alignSelf || 'center',
      marginRight: marginRight,
      marginTop: marginTop,
      marginLeft: marginLeft,
      marginBottom: marginBottom,
      borderRadius: borderRadius || normalizeSize(6),
      paddingVertical: paddingVertical || 0,
      paddingHorizontal: paddingHorizontal || 0,
      padding: 16,
    }),
    [
      disabled,
      backgroundColor,
      borderWidth,
      borderColor,
      width,
      alignSelf,
      marginRight,
      marginTop,
      marginLeft,
      marginBottom,
      borderRadius,
      paddingVertical,
      paddingHorizontal,
    ]
  );

  const labelStyle = useMemo(
    () => ({
      fontSize: normalizeSize(fontSize || 14),
      color: color || Colors?.white,
      fontFamily: fontFamily || Fonts.Medium,
      lineHeight: lineHeight,
    }),
    [fontSize, color, fontFamily, lineHeight]
  );

  return (
    <Button
      maxFontSizeMultiplier={1}
      onPress={onPress}
      disabled={disabled || !onPress}
      loading={loading}
      contentStyle={contentStyle}
      style={buttonStyle}
      labelStyle={labelStyle}
    >
      {renderButtonContent()}
    </Button>
  );
};

export default memo(CustomButton);

