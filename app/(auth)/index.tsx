import { Fonts } from '@/assets/fonts';
import { IMAGES } from '@/assets/images';
import CustomButton from '@/components/CustomButton';
import CustomCheckbox from '@/components/CustomCheckbox';
import CustomImage from '@/components/CustomImage';
import CustomInput from '@/components/CustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = useCallback(() => {
    if (!username.trim()) {
      return;
    }
    if (!password.trim()) {
      return;
    }
    // Navigate to main app
    router.replace('/(main)');
  }, [username, password]);

  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`${provider} login`);
    // Implement social login logic
  }, []);
  const handleForgetPassword = useCallback(() => {
     router.push('/(auth)/reset-password')
  }, [router]);

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
                label="Login Page"
                fontSize={32}
                fontFamily={Fonts.SemiBold}
                color={Colors.black}
                marginBottom={metrics.height(8)}
              />
              <CustomText
                label="Ready to explore? Sign in now and unlock a universe of knowledge designed just for you."
                fontSize={13}
                fontFamily={Fonts.Regular}
                color={Colors.gray}
                lineHeight={20}
              />
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor={Colors.gray}
                left={<TextInput.Icon icon="account-outline" size={22} color={Colors.gray} style={{ marginTop: metrics.height(10) }} />}
              />

              <CustomInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={Colors.gray}
                left={<TextInput.Icon icon="lock-outline" size={22} color={Colors.gray} style={{ marginTop: metrics.height(8) }} />}
                right={true}
              />
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={handleForgetPassword}
               activeOpacity={0.8}
              >
                <CustomText
                  label="Forget Password"
                  fontSize={13}
                  fontFamily={Fonts.Medium}
                  color={Colors.red}
                />
              </TouchableOpacity>

              <CustomCheckbox
                checked={rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
                label="Remember Me"
                labelColor={Colors.gray}
                checkboxColor={Colors.gray}
              />
            </View>

            {/* Login Button */}
            <CustomButton
              label="Log In"
              onPress={handleLogin}
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
                label="Login"
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

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <CustomText
                label="Don't have an account? "
                fontSize={16}
                fontFamily={Fonts.Regular}
                color={Colors.gray}
              />
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <CustomText
                  label="Sign Up"
                  fontSize={16}
                  fontFamily={Fonts.Bold}
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Footer - Fixed at bottom */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => console.log('Terms of Service')}>
            <CustomText
              label="Terms of Service"
              fontSize={14}
              fontFamily={Fonts.Regular}
              color={Colors.gray}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => console.log('Privacy Policy')}>
            <CustomText
              label="Privacy Policy"
              fontSize={14}
              fontFamily={Fonts.Regular}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>
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
    marginTop: metrics.height(90),
    marginBottom: metrics.height(32), 
  },
  inputContainer: {
    // gap: metrics.height(16),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: metrics.height(5),
    marginBottom: metrics.height(8),
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialContainer: {
    marginTop: metrics.height(43),
    alignItems: 'center',
  },
  loginDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: metrics.height(16),
  },
  loginDividerLine: {
    flex: 1,
    height:2,
    backgroundColor: Colors.borderLine,
    opacity: 0.3,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.height(35),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: metrics.width(25),
    backgroundColor: Colors.white,
  },
});
