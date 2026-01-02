import { Fonts } from '@/assets/fonts';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { normalizeSize } from '@/utils/normalize';
import { heightDP } from '@/utils/responsive';
import { Controller } from 'react-hook-form';
import { useVerificationForm, VerificationFormData } from '@/hooks/useAuthForm';

const INITIAL_TIME = 120; // 2 minutes in seconds
const INITIAL_CODE = ['', '', '', ''] as const;
const OTP_LENGTH = 4;
const FOCUS_DELAY = 50;

export default function VerificationScreen() {
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
  const [localCode, setLocalCode] = useState<string[]>(Array.from(INITIAL_CODE));
  const inputRefs = useRef<(TextInput | null)[]>([]);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useVerificationForm();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleCodeChange = useCallback((text: string, index: number) => {
    const numericText = text.replace(/\D/g, '');
    
    setLocalCode((prev) => {
      const newCodeArray = [...prev];
      newCodeArray[index] = numericText.slice(-1) || '';
      
      const newCode = newCodeArray.join('');
      setValue('code', newCode, { 
        shouldValidate: true, 
        shouldDirty: true,
        shouldTouch: true 
      });

      if (numericText && index < OTP_LENGTH - 1) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, FOCUS_DELAY);
      }

      return newCodeArray;
    });
  }, [setValue]);

  const handleKeyPress = useCallback((key: string, index: number) => {
    if (key === 'Backspace') {
      setLocalCode((prev) => {
        const newCodeArray = [...prev];
        
        if (!prev[index] && index > 0) {
          newCodeArray[index - 1] = '';
          const newCode = newCodeArray.join('');
          setValue('code', newCode, { shouldValidate: true });
          
          setTimeout(() => {
            inputRefs.current[index - 1]?.focus();
          }, FOCUS_DELAY);
        } else if (prev[index]) {
          newCodeArray[index] = '';
          const newCode = newCodeArray.join('');
          setValue('code', newCode, { shouldValidate: true });
        }

        return newCodeArray;
      });
    }
  }, [setValue]);

  const handleContinue = useCallback((data: VerificationFormData) => {
    console.log('Verification code:', data.code);
    // Navigate to update password screen
    router.push('/(auth)/update-password');
  }, []);

  const handleResendCode = useCallback(() => {
    setTimeRemaining(INITIAL_TIME);
    setLocalCode(Array.from(INITIAL_CODE));
    setValue('code', '');
    inputRefs.current[0]?.focus();
    console.log('Resending code...');
  }, [setValue]);

  const formattedTime = useMemo(() => formatTime(timeRemaining), [timeRemaining, formatTime]);
  const errorMessage = useMemo(() => errors.code?.message || 'Invalid verification code', [errors.code]);
  const otpBoxBackgroundColor = useMemo(() => Colors.white10, []);

  const handleChangeNumber = useCallback(() => {
    router.back();
  }, []);

  const renderOTPInput = useCallback((digit: string, index: number) => (
    <Controller
      key={index}
      control={control}
      name="code"
      render={() => (
        <TextInput
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[styles.otpBox, { backgroundColor: otpBoxBackgroundColor }]}
          value={digit}
          onChangeText={(text) => handleCodeChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          textContentType="oneTimeCode"
          selectTextOnFocus
        />
      )}
    />
  ), [control, handleCodeChange, handleKeyPress, otpBoxBackgroundColor]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
      <View style={styles.header}>
            <CustomText
              label="Verification"
              fontSize={25}
              fontFamily={Fonts.Bold}
              color={Colors.black}
              marginBottom={metrics.height(8)}
            />
            <View style={styles.descriptionRow}>
              <CustomText
                label="Enter The Verification Code We Sent To"
                fontSize={13}
                fontFamily={Fonts.Regular}
                color={Colors.gray}
                lineHeight={20}
              />
            </View>
            <View style={styles.phoneRow}>
              <CustomText
                label="+923*******74"
                fontSize={13}
                fontFamily={Fonts.Regular}
                color={Colors.gray}
              />
              <TouchableOpacity onPress={handleChangeNumber}>
                <CustomText
                  label="Change Number?"
                  fontSize={13}
                  fontFamily={Fonts.Medium}
                  color={Colors.primary}
                  marginLeft={metrics.width(8)}
                />
              </TouchableOpacity>
            </View>
          </View>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          bounces={false}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
        >
         

          <View style={styles.centeredContent}>
            {/* Verification Code Label */}
            <View style={styles.codeLabelRow}>
              <CustomText
                label="Verification Code"
                fontSize={13}
                fontFamily={Fonts.SemiBold}
                color={Colors.black}
              />
              <TouchableOpacity onPress={handleResendCode}>
                <CustomText
                  label="Re-send Code"
                  fontSize={13}
                  fontFamily={Fonts.Medium}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>

            {/* OTP Input Boxes */}
            <View style={styles.otpContainer}>
              {localCode.map((digit, index) => renderOTPInput(digit, index))}
            </View>
            
            {/* Error Message */}
            {errors.code && (
              <View style={styles.errorContainer}>
                <CustomText
                  label={errorMessage}
                  fontSize={12}
                  fontFamily={Fonts.Regular}
                  color={Colors.red}
                  marginTop={metrics.height(8)}
                />
              </View>
            )}

            {/* Timer */}
            <View style={styles.timerRow}>
              <CustomText
                label="Time Remaining"
                fontSize={12}
                fontFamily={Fonts.Regular}
                color={Colors.gray}
              />
              <CustomText
                label={formattedTime}
                fontSize={12}
                fontFamily={Fonts.Regular}
                color={Colors.gray}
              />
            </View>

            {/* Continue Button */}
            <CustomButton
              label="Continue"
              onPress={handleSubmit(handleContinue)}
              backgroundColor={Colors.primary}
              borderRadius={12}
              fontSize={16}
              fontFamily={Fonts.Bold}
              marginTop={metrics.height(80)}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: metrics.width(25),
    paddingVertical: metrics.height(40),
  },
  backButton: {
    position: 'absolute',
    top: metrics.height(20),
    left: metrics.width(25),
    width: metrics.width(40),
    height: metrics.width(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  header: {
    width: '100%',
    marginBottom: metrics.height(40),
    paddingHorizontal: metrics.width(25),
    paddingTop: metrics.height(70),
  },
  descriptionRow: {
    marginBottom: metrics.height(4),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.height(4),
  },
  centeredContent: {
    width: '100%',
    alignItems: 'center',
  },
  codeLabelRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.height(25),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: metrics.height(16),
    gap: metrics.width(12),
  },
  otpBox: {
    flex: 1,
    height: heightDP(60),
    borderRadius: metrics.width(8),
    fontSize: normalizeSize(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.black,
  },
  timerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.height(8),
    top: metrics.height(15),
  },
  errorContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: metrics.height(8),
  },
});

