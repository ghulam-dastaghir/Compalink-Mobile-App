import { Fonts } from '@/assets/fonts';
import { IMAGES } from '@/assets/images';
import CustomButton from '@/components/CustomButton';
import ControlledCustomCheckbox from '@/components/ControlledCustomCheckbox';
import CustomImage from '@/components/CustomImage';
import ControlledCustomInput from '@/components/ControlledCustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLoginForm, LoginFormData } from '@/hooks/useAuthForm';

type InputField = {
  name: 'username' | 'password';
  placeholder: string;
  icon: string;
  secureTextEntry?: boolean;
  showRightIcon?: boolean;
  iconMarginTop: number;
};

type SocialProvider = 'facebook' | 'google' | 'apple';

const SocialIconButton = React.memo<{
  provider: SocialProvider;
  icon: typeof IMAGES.FacebookIcon;
  onPress: () => void;
  iconSize: number;
  style: any;
}>(({ icon, onPress, iconSize, style }) => (
  <TouchableOpacity style={style} activeOpacity={0.8} onPress={onPress}>
    <CustomImage source={icon} width={iconSize} height={iconSize} />
  </TouchableOpacity>
));

SocialIconButton.displayName = 'SocialIconButton';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
  } = useLoginForm();

  const handleLogin = useCallback((data: LoginFormData) => {
    console.log('Login data:', data);
    router.replace('/(main)');
  }, []);

  const handleForgetPassword = useCallback(() => {
    router.push('/(auth)/reset-password');
  }, []);

  const handleSignUp = useCallback(() => {
    router.push('/(auth)/register');
  }, []);

  const handleSocialLogin = useCallback((provider: SocialProvider) => {
    console.log(`${provider} login`);
    // Implement social login logic
  }, []);

  const handleTermsOfService = useCallback(() => {
    console.log('Terms of Service');
  }, []);

  const handlePrivacyPolicy = useCallback(() => {
    console.log('Privacy Policy');
  }, []);

  const inputFields: InputField[] = useMemo(
    () => [
      {
        name: 'username',
        placeholder: 'Username',
        icon: 'account-outline',
        iconMarginTop: metrics.height(10),
      },
      {
        name: 'password',
        placeholder: 'Password',
        icon: 'lock-outline',
        secureTextEntry: true,
        showRightIcon: true,
        iconMarginTop: metrics.height(8),
      },
    ],
    []
  );

  const socialProviders: Array<{ provider: SocialProvider; icon: typeof IMAGES.FacebookIcon }> = useMemo(
    () => [
      { provider: 'facebook', icon: IMAGES.FacebookIcon },
      { provider: 'google', icon: IMAGES.GoogleIcon },
      { provider: 'apple', icon: IMAGES.AppleIcon },
    ],
    []
  );

  const containerStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: metrics.width(20),
    }),
    []
  );

  const inputIcons = useMemo(
    () => ({
      username: (
        <TextInput.Icon
          icon="account-outline"
          size={22}
          color={Colors.gray}
          style={{ marginTop: metrics.height(10) }}
        />
      ),
      password: (
        <TextInput.Icon
          icon="lock-outline"
          size={22}
          color={Colors.gray}
          style={{ marginTop: metrics.height(8) }}
        />
      ),
    }),
    []
  );

  const socialLoginHandlers = useMemo(
    () => ({
      facebook: () => handleSocialLogin('facebook'),
      google: () => handleSocialLogin('google'),
      apple: () => handleSocialLogin('apple'),
    }),
    [handleSocialLogin]
  );

  const socialIconSize = useMemo(() => metrics.width(27), []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        bounces={false}
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
              {inputFields.map((field) => (
                <ControlledCustomInput
                  key={field.name}
                  control={control}
                  name={field.name}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.gray}
                  secureTextEntry={field.secureTextEntry}
                  right={field.showRightIcon}
                  left={inputIcons[field.name]}
                />
              ))}
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={handleForgetPassword} activeOpacity={0.8}>
                <CustomText
                  label="Forget Password"
                  fontSize={13}
                  fontFamily={Fonts.Medium}
                  color={Colors.red}
                />
              </TouchableOpacity>

              <ControlledCustomCheckbox
                control={control}
                name="rememberMe"
                label="Remember Me"
                labelColor={Colors.gray}
                checkboxColor={Colors.gray}
              />
            </View>

            {/* Login Button */}
            <CustomButton
              label="Log In"
              onPress={handleSubmit(handleLogin)}
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
                {socialProviders.map(({ provider, icon }) => (
                  <SocialIconButton
                    key={provider}
                    provider={provider}
                    icon={icon}
                    onPress={socialLoginHandlers[provider]}
                    iconSize={socialIconSize}
                    style={styles.socialIcon}
                  />
                ))}
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
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.8}>
                <CustomText
                  label="Sign Up"
                  fontSize={16}
                  fontFamily={Fonts.Bold}
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAwareScrollView>

      {/* Footer - Fixed at bottom */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleTermsOfService} activeOpacity={0.8}>
          <CustomText
            label="Terms of Service"
            fontSize={14}
            fontFamily={Fonts.Regular}
            color={Colors.gray}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePrivacyPolicy} activeOpacity={0.8}>
          <CustomText
            label="Privacy Policy"
            fontSize={14}
            fontFamily={Fonts.Regular}
            color={Colors.gray}
          />
        </TouchableOpacity>
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
  },
  header: {
    marginTop: metrics.height(65),
    marginBottom: metrics.height(32), 
  },
  inputContainer: {
    marginTop: metrics.height(25),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: metrics.height(5),
    marginBottom: metrics.height(8),
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
    paddingVertical: metrics.height(15),
    backgroundColor: Colors.white,
    marginBottom: metrics.height(20),
  },
});
