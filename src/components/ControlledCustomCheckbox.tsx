import React, { memo } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import CustomCheckbox from './CustomCheckbox';
import { Fonts } from '../assets/fonts';
import { Colors } from '../constants/colors';

interface ControlledCustomCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  labelFontSize?: number;
  labelFontFamily?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  checkboxSize?: number;
  checkboxColor?: string;
}

function ControlledCustomCheckboxComponent<T extends FieldValues>({
  control,
  name,
  label,
  labelColor = Colors.primary,
  labelFontSize = 14,
  labelFontFamily = Fonts.Regular,
  containerStyle,
  disabled = false,
  checkboxSize = 20,
  checkboxColor = Colors.primary,
}: ControlledCustomCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <CustomCheckbox
          checked={value || false}
          onPress={() => onChange(!value)}
          label={label}
          labelColor={labelColor}
          labelFontSize={labelFontSize}
          labelFontFamily={labelFontFamily}
          containerStyle={containerStyle}
          disabled={disabled}
          checkboxSize={checkboxSize}
          checkboxColor={checkboxColor}
        />
      )}
    />
  );
}

export const ControlledCustomCheckbox = memo(ControlledCustomCheckboxComponent) as <T extends FieldValues>(
  props: ControlledCustomCheckboxProps<T>
) => React.ReactElement;

export default ControlledCustomCheckbox;

