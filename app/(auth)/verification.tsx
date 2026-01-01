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

export default function VerificationScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef<(TextInput | null)[]>([]);

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
    const newCode = [...code];
    newCode[index] = text.slice(-1); // Only take the last character
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = useCallback(() => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      console.log('Verification code:', fullCode);
      // Navigate to next screen
      // router.replace('/(main)');
    }
  }, [code]);

  const handleResendCode = useCallback(() => {
    setTimeRemaining(300); // Reset timer
    setCode(['', '', '', '']);
    inputRefs.current[0]?.focus();
    // Implement resend logic
    console.log('Resending code...');
  }, []);

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
              {code.map((digit, index) => (
                <TextInput
                  key={index}
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
              ))}
            </View>

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
              onPress={handleContinue}
              backgroundColor={Colors.primary}
              borderRadius={12}
              fontSize={16}
              fontFamily={Fonts.Bold}
              marginTop={metrics.height(40)}
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
    fontSize: normalizeSize(20),
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  timerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.height(8),
  },
});

