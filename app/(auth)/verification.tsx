import { Fonts } from '@/assets/fonts';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics,  } from '@/utils/metrics';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { normalizeSize } from '@/utils/normalize';
import { heightDP } from '@/utils/responsive';
import { Controller } from 'react-hook-form';
import { useVerificationForm, VerificationFormData } from '@/hooks/useAuthForm';

export default function VerificationScreen() {
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const [localCode, setLocalCode] = useState(['', '', '', '']); // Local state for immediate UI updates
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (text: string, index: number) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/\D/g, '');
    
    // Update local state immediately for UI
    const newCodeArray = [...localCode];
    newCodeArray[index] = numericText.slice(-1) || ''; // Only take last character
    setLocalCode(newCodeArray);
    
    // Sync with React Hook Form for validation
    const newCode = newCodeArray.join('');
    setValue('code', newCode, { 
      shouldValidate: true, 
      shouldDirty: true,
      shouldTouch: true 
    });

    // Auto-focus next input if digit entered
    if (numericText && index < 3) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 50);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      // If current field is empty and backspace is pressed, go to previous field
      if (!localCode[index] && index > 0) {
        // Clear previous field
        const newCodeArray = [...localCode];
        newCodeArray[index - 1] = '';
        setLocalCode(newCodeArray);
        
        // Sync with React Hook Form
        const newCode = newCodeArray.join('');
        setValue('code', newCode, { shouldValidate: true });
        
        // Focus previous input
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 50);
      } else if (localCode[index]) {
        // Clear current field
        const newCodeArray = [...localCode];
        newCodeArray[index] = '';
        setLocalCode(newCodeArray);
        
        // Sync with React Hook Form
        const newCode = newCodeArray.join('');
        setValue('code', newCode, { shouldValidate: true });
      }
    }
  };

  const handleContinue = useCallback((data: VerificationFormData) => {
    console.log('Verification code:', data.code);
    // Navigate to update password screen
    router.push('/(auth)/update-password');
  }, []);

  const handleResendCode = useCallback(() => {
    setTimeRemaining(120); // Reset timer to 2 minutes
    setLocalCode(['', '', '', '']); // Reset local state
    setValue('code', ''); // Reset form state
    inputRefs.current[0]?.focus();
    // Implement resend logic
    console.log('Resending code...');
  }, [setValue]);

  const handleChangeNumber = useCallback(() => {
    router.back();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
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
              {localCode.map((digit, index) => (
                <Controller
                  key={index}
                  control={control}
                  name="code"
                  render={() => (
                    <TextInput
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      style={styles.otpBox}
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
              ))}
            </View>
            
            {/* Error Message */}
            {errors.code && (
              <View style={styles.errorContainer}>
                <CustomText
                  label={errors.code.message || 'Invalid verification code'}
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
                label={formatTime(timeRemaining)}
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
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: metrics.width(25),
    paddingTop: metrics.height(20),
    paddingBottom: metrics.height(40),
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
    marginTop: metrics.height(60),
    marginBottom: metrics.height(40),
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: metrics.height(400),
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
    backgroundColor: '#FAFAFA',
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

