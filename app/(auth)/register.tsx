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
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRegisterForm, RegisterFormData } from '@/hooks/useAuthForm';

type InputField = {
  name: 'username' | 'email' | 'number' | 'password' | 'confirmPassword';
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  showRightIcon?: boolean;
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

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
  } = useRegisterForm();

  const handleSignUp = useCallback((data: RegisterFormData) => {
    console.log('Registration data:', data);
    router.replace('/(main)');
  }, []);

  const handleSocialLogin = useCallback((provider: SocialProvider) => {
    console.log(`${provider} login`);
    // Implement social login logic
  }, []);

  const handleLogin = useCallback(() => {
    router.push('/');
  }, []);

  const inputFields: InputField[] = useMemo(
    () => [
      {
        name: 'username',
        placeholder: 'Input your full name',
        keyboardType: 'default',
        autoCapitalize: 'words',
      },
      {
        name: 'email',
        placeholder: 'Input your email',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      },
      {
        name: 'number',
        placeholder: 'Enter Your Number',
        keyboardType: 'phone-pad',
      },
      {
        name: 'password',
        placeholder: 'Enter your password',
        secureTextEntry: true,
        showRightIcon: true,
      },
      {
        name: 'confirmPassword',
        placeholder: 'Confirm your password',
        secureTextEntry: true,
        showRightIcon: true,
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
            {inputFields.map((field) => (
              <ControlledCustomInput
                key={field.name}
                control={control}
                name={field.name}
                placeholder={field.placeholder}
                placeholderTextColor={Colors.gray}
                keyboardType={field.keyboardType}
                autoCapitalize={field.autoCapitalize}
                secureTextEntry={field.secureTextEntry}
                right={field.showRightIcon}
              />
            ))}
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

          {/* Login Link */}
          <View style={styles.loginLinkContainer}>
            <CustomText
              label="Already have an account? "
              fontSize={16}
              fontFamily={Fonts.Regular}
              color={Colors.gray}
            />
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
              <CustomText
                label="Log In"
                fontSize={16}
                fontFamily={Fonts.Bold}
                color={Colors.gray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    marginTop: metrics.height(60),
    marginBottom: metrics.height(32),
  },
  inputContainer: {
    marginTop: metrics.height(30),
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
    height: 2,
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
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.height(35),
    marginBottom: metrics.height(20),
  },
});
