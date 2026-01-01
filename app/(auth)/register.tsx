import { Fonts } from '@/assets/fonts';
import { IMAGES } from '@/assets/images';
import CustomButton from '@/components/CustomButton';
import CustomImage from '@/components/CustomImage';
import ControlledCustomInput from '@/components/ControlledCustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegisterForm, RegisterFormData } from '@/hooks/useAuthForm';

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
  } = useRegisterForm();

  const handleSignUp = useCallback((data: RegisterFormData) => {
    console.log('Registration data:', data);
    // Navigate to main app
    router.replace('/(main)');
  }, []);

  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`${provider} login`);
    // Implement social login logic
  }, []);

  const containerStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: metrics.width(20),
    }),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={containerStyle}>
            {/* Header */}
            <View style={styles.header}>
              <CustomText
                label="Registration Page"
                fontSize={32}
                fontFamily={Fonts.SemiBold}
                color={Colors.black}
                marginBottom={metrics.height(8)}
              />
              <CustomText
                label="Create your account and treat yourself to a meal at the restaurants you love. Sign up now!"
                fontSize={13}
                fontFamily={Fonts.Regular}
                color={Colors.gray}
                lineHeight={20}
              />
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <ControlledCustomInput
                control={control}
                name="username"
                placeholder="Input your full name"
                placeholderTextColor={Colors.gray}
              />

              <ControlledCustomInput
                control={control}
                name="email"
                placeholder="Input your email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={Colors.gray}
              />

              <ControlledCustomInput
                control={control}
                name="number"
                placeholder="Enter Your Number"
                keyboardType="phone-pad"
                placeholderTextColor={Colors.gray}
              />

              <ControlledCustomInput
                control={control}
                name="password"
                placeholder="Enter your password"
                secureTextEntry
                placeholderTextColor={Colors.gray}
                right={true}
              />

              <ControlledCustomInput
                control={control}
                name="confirmPassword"
                placeholder="Confirm your password"
                secureTextEntry
                placeholderTextColor={Colors.gray}
                right={true}
              />
            </View>
            {/* Sign Up Button */}
            <CustomButton
              label="Sign Up"
              onPress={handleSubmit(handleSignUp)}
              backgroundColor={Colors.primary}
              borderRadius={12}
              marginTop={metrics.height(32)}
              fontSize={16}
              fontFamily={Fonts.Bold}
            />

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <View style={styles.loginDividerContainer}>
              <View style={styles.loginDividerLine} />
              <CustomText
                label="Sign Up "
                fontSize={14}
                fontFamily={Fonts.Medium}
                color={Colors.gray}
                marginLeft={metrics.width(12)}
                marginRight={metrics.width(12)}
              />
              <View style={styles.loginDividerLine} />
            </View>

              <View style={styles.socialIconsContainer}>
                <TouchableOpacity
                  style={styles.socialIcon}
                  activeOpacity={0.8}
                  onPress={() => handleSocialLogin('facebook')}
                >
                  <CustomImage source={IMAGES.FacebookIcon} width={metrics.width(27)} height={metrics.width(27)} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialIcon}
                  activeOpacity={0.8}
                  onPress={() => handleSocialLogin('google')}
                >
                  <CustomImage source={IMAGES.GoogleIcon} width={metrics.width(27)} height={metrics.width(27)} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialIcon}
                  activeOpacity={0.8}
                  onPress={() => handleSocialLogin('apple')}
                >
                  <CustomImage source={IMAGES.AppleIcon} width={metrics.width(27)} height={metrics.width(27)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: metrics.height(80),
  },
  header: {
    marginTop: metrics.height(60),
    marginBottom: metrics.height(32), 
  },
  socialContainer: {
    marginTop: metrics.height(30),
    alignItems: 'center',
  },
  loginDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: metrics.height(10),
  },
  loginDividerLine: {
    flex: 1,
    height:2,
    backgroundColor: Colors.borderLine,
    opacity: 0.3,
  },
  inputContainer: {
    marginTop: metrics.height(30),
  },  
  socialIconsContainer: {
    flexDirection: 'row',
    gap: metrics.width(20),
    marginTop: metrics.height(10),
  },
  socialIcon: {
    width: metrics.width(48),
    height: metrics.width(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
