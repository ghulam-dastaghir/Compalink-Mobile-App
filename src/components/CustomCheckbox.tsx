import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Fonts } from '../assets/fonts';
import { Colors } from '../constants/colors';
import { metrics } from '../utils/metrics';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  labelColor?: string;
  labelFontSize?: number;
  labelFontFamily?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  checkboxSize?: number;
  checkboxColor?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onPress,
  label,
  labelColor = Colors.primary,
  labelFontSize = 14,
  labelFontFamily = Fonts.Regular,
  containerStyle,
  disabled = false,
  checkboxSize = 20,
  checkboxColor = Colors.primary,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, containerStyle]}
      activeOpacity={0.6}
    >
      <CustomIcon
        family="Ionicons"
        name={checked ? 'checkbox' : 'square-outline'}
        size={checkboxSize}
        color={checkboxColor}
      />
      {label && (
        <CustomText
          label={label}
          fontSize={labelFontSize}
          fontFamily={labelFontFamily}
          color={labelColor}
          marginLeft={metrics.width(8)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(CustomCheckbox);

