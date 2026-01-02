import React, { memo } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { TextInputProps } from 'react-native-paper';
import CustomInput, { CustomInputProps } from './CustomInput';

type CustomInputPropsWithoutControl = Omit<
  CustomInputProps & TextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'InputError' | 'reference'
>;

export interface ControlledCustomInputProps<T extends FieldValues> extends CustomInputPropsWithoutControl {
  control: Control<T>;
  name: FieldPath<T>;
  errorMessage?: string;
}

function ControlledCustomInputComponent<T extends FieldValues>({
  control,
  name,
  errorMessage,
  ...inputProps
}: ControlledCustomInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <CustomInput
          {...(inputProps as any)}
          value={value ?? ''}
          onChangeText={onChange}
          onBlur={onBlur}
          InputError={error?.message || errorMessage}
        />
      )}
    />
  );
}

export const ControlledCustomInput = memo(ControlledCustomInputComponent) as <T extends FieldValues>(
  props: ControlledCustomInputProps<T>
) => React.ReactElement;

export default ControlledCustomInput;

