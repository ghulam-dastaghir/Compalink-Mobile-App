import { heightDP } from '@/utils/responsive';
import React, { memo, useState } from 'react';
import { Platform, TextInput as RNTextInput, TextStyle, View, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { Fonts } from '../assets/fonts';
import { Colors } from '../constants';
import { useCustomInputStyle } from '../styles/styles';
import { metrics } from '../utils/metrics';
import { normalizeSize } from '../utils/normalize';
import CustomText from './CustomText';

export interface CustomInputProps {
  onPress?: () => void;
  errorMessage?: string;
  inputTextColor?: string;
  searchSize?: number;
  searchColor?: string;
  reference?: React.Ref<RNTextInput>;
  labelColor?: string;
  textStyle?: TextStyle;
  mainStyle?: ViewStyle;
  right?: boolean;
  left?: React.ReactNode;
  label?: string;
  InputError?: string;
  translationEnabled?: boolean;
  translationEnabledError?: boolean;
  Addressbutton?: () => void;
  AddressTitle?: string;
  disabled?: boolean;
  editable?: boolean;
  value?: string | number;
  contentStyle?: ViewStyle;
  outlineStyle?: ViewStyle;
  outlineColor?: string;
  activeOutlineColor?: string;
  placeholderTextColor?: string;
  labelFontSize?: number;
  labelFontFamily?: string;
  textMarginBottom?: number;
  backgroundColor?: string;
  borderColor?: string;
  height?: number;
  borderRadius?: number;
}

const CustomInput: React.FC<Omit<ViewStyle & TextStyle & TextInputProps, 'left' | 'right'> & CustomInputProps> = ({
  placeholder,
  onChangeText,
  value,
  right,
  left,
  keyboardType,
  secureTextEntry,
  label,
  multiline,
  maxLength,
  marginBottom,
  editable,
  inputTextColor,
  reference,
  autoCapitalize,
  textStyle,
  mainStyle,
  onFocus,
  onBlur,
  InputError,
  translationEnabled,
  translationEnabledError,
  Addressbutton,
  AddressTitle,
  disabled,
  contentStyle,
  outlineStyle,
  outlineColor: customOutlineColor,
  activeOutlineColor: customActiveOutlineColor,
  placeholderTextColor: customPlaceholderTextColor,
  labelFontSize,
  labelFontFamily,
  textMarginBottom,
  backgroundColor,
  borderColor,
  height,
  borderRadius,
  ...restProps
}) => {
  const styles = useCustomInputStyle();
  const [hidePass, setHidePass] = useState(secureTextEntry);
  const hasError = !!InputError;

  return (
    <View style={[styles.main, mainStyle, { marginBottom: metrics.height(Number(marginBottom) || 15) }]}>
      <TextInput
        maxFontSizeMultiplier={1}
        style={[
          {
            fontSize: normalizeSize(14),
            fontFamily: Fonts.Regular,
            backgroundColor: hasError ? Colors.errorBackground : (backgroundColor ||'transparent'),
            borderWidth: hasError ? 2 : 1,
            borderRadius: normalizeSize(borderRadius || 6),
            borderColor: hasError ? (Colors.red) : (borderColor || Colors.borderLine),
          },
          textStyle,
        ]}
        contentStyle={[
          {
            fontFamily: Fonts.Regular,
            color: Colors.black,
            // paddingLeft: left ? 0 : 15,
            // paddingRight: right ? 0 : 15,
            height: multiline ? undefined : heightDP(height || 60),
            // alignItems: 'center',
            // justifyContent: 'center',
            ...(multiline && Platform.OS === 'android' ? { paddingTop: 10 } : {}),
          },
          contentStyle,
        ]}
        outlineColor={customOutlineColor || 'transparent'}
        placeholder={placeholder}
        placeholderTextColor={customPlaceholderTextColor || Colors.black}
        // dense={true}
        activeOutlineColor={customActiveOutlineColor || 'transparent'}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        disabled={disabled}
        autoComplete="off"
        left={left || undefined}
        right={
          right ? (
            <TextInput.Icon
              icon={!hidePass ? 'eye' : 'eye-off'}
              onPress={() => setHidePass(!hidePass)}
              color={Colors.gray}
            />
          ) : null
        }
        secureTextEntry={hidePass}
        autoCapitalize={autoCapitalize}
        mode="outlined"
        value={value?.toString()}
        multiline={multiline}
        editable={editable}
        maxLength={maxLength}
        ref={reference}
        onFocus={onFocus}
        autoCorrect={false}
        onBlur={onBlur}
        selectionColor={Colors.primary}
        cursorColor={Colors.primary}
        underlineColorAndroid="transparent"
        // textAlignVertical={multiline && Platform.OS === 'android' ? 'top' : 'center'}
        {...restProps}
      />
      {InputError && (
        <CustomText
          label={InputError}
          marginTop={normalizeSize(2)}
          translationEnabled={translationEnabledError}
          color={Colors.red}
          fontSize={10}
          fontFamily={Fonts.Regular}
        />
      )}
    </View>
  );
};

export default memo(CustomInput);

