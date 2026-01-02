import { Fonts } from '@/assets/fonts';
import CustomButton from '@/components/CustomButton';
import ControlledCustomInput from '@/components/ControlledCustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useResetPasswordForm, ResetPasswordFormData } from '@/hooks/useAuthForm';

export default function ResetPasswordScreen() {
  const {
    control,
    handleSubmit,
  } = useResetPasswordForm();

  const handleReset = useCallback((data: ResetPasswordFormData) => {
    console.log('Reset password for:', data.emailOrPhone);
    router.push('/(auth)/verification');
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const inputBackgroundColor = useMemo(() => Colors.white10, []);
  const iconSize = useMemo(() => 24, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back-ios" size={iconSize} color={Colors.black} />
        </TouchableOpacity>
      <View style={styles.container}>
        

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
          <View style={styles.header}>
            <CustomText
              label="Reset Password"
              fontSize={25}
              fontFamily={Fonts.Bold}
              color={Colors.black}
              marginBottom={metrics.height(8)}
            />
            <CustomText
              label="Enter Your Email/Phone To Reset Your Password"
              fontSize={12}
              fontFamily={Fonts.Regular}
              color={Colors.gray}
              lineHeight={20}
            />
          </View>
          
          <View style={styles.centeredContent}>
            <View style={styles.inputContainer}>
              <CustomText
                label="Email/ Phone"
                fontSize={13}
                fontFamily={Fonts.SemiBold}
                color={Colors.black}
                marginBottom={metrics.height(10)}
              />
              <ControlledCustomInput
                control={control}
                name="emailOrPhone"
                placeholder="+92 310 1314974"
                placeholderTextColor={Colors.gray}
                backgroundColor={inputBackgroundColor}
                borderColor={inputBackgroundColor}
              />
            </View>
            <CustomButton
              label="Reset"
              onPress={handleSubmit(handleReset)}
              backgroundColor={Colors.primary}
              borderRadius={12}
              fontSize={16}
              fontFamily={Fonts.Bold}
              marginTop={metrics.height(60)}
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
    paddingHorizontal: metrics.width(25),
    paddingTop: metrics.height(20),
    paddingBottom: metrics.height(40),
  },
  backButton: {
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
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: metrics.height(400),
  },
  inputContainer: {
    width: '100%',
  },
});

