import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomText from '@/components/CustomText';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import CustomIcon from '@/components/CustomIcon';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/assets/fonts';
import { metrics } from '@/utils/metrics';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fullName, email, phoneNumber, password, confirmPassword]);

  const handleSignUp = useCallback(() => {
    if (validateForm()) {
      // Navigate to main app after successful registration
      router.replace('/(main)');
    }
  }, [validateForm]);

  const handleSocialSignUp = useCallback((provider: string) => {
    console.log(`${provider} sign up`);
    // Implement social sign up logic
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
              fontFamily={Fonts.Bold}
              color={Colors.text.primary}
              marginBottom={metrics.height(8)}
            />
            <CustomText
              label="Create your account and treat yourself to a meal at the restaurants you love. Sign up now!"
              fontSize={14}
              fontFamily={Fonts.Regular}
              color={Colors.text.primary}
              lineHeight={20}
            />
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Input your full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) {
                  setErrors((prev) => ({ ...prev, fullName: '' }));
                }
              }}
              InputError={errors.fullName}
            />

            <CustomInput
              placeholder="Input your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: '' }));
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              InputError={errors.email}
            />

            <CustomInput
              placeholder="Enter Your Number"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                if (errors.phoneNumber) {
                  setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                }
              }}
              keyboardType="phone-pad"
              InputError={errors.phoneNumber}
            />

            <CustomInput
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: '' }));
                }
              }}
              secureTextEntry
              right={true}
              InputError={errors.password}
            />

            <CustomInput
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) {
                  setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }
              }}
              secureTextEntry
              right={true}
              InputError={errors.confirmPassword}
            />
          </View>

          {/* Sign Up Button */}
          <CustomButton
            label="Sign Up"
            onPress={handleSignUp}
            backgroundColor={Colors.primary}
            borderRadius={12}
            paddingVertical={metrics.height(16)}
            marginTop={metrics.height(24)}
            fontSize={16}
            fontFamily={Fonts.SemiBold}
          />

          {/* Social Sign Up */}
          <View style={styles.socialContainer}>
            <CustomText
              label="Sign Up"
              fontSize={14}
              fontFamily={Fonts.Medium}
              color={Colors.text.primary}
              marginBottom={metrics.height(16)}
              textAlign="center"
            />

            <View style={styles.socialIconsContainer}>
              <TouchableOpacity
                style={styles.socialIcon}
                onPress={() => handleSocialSignUp('facebook')}
              >
                <CustomIcon family="FontAwesome" name="facebook" size={24} color="#1877F2" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialIcon}
                onPress={() => handleSocialSignUp('google')}
              >
                <CustomIcon family="FontAwesome5" name="google" size={24} color="#4285F4" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialIcon}
                onPress={() => handleSocialSignUp('apple')}
              >
                <CustomIcon family="FontAwesome5" name="apple" size={24} color={Colors.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: metrics.height(20),
  },
  header: {
    marginTop: metrics.height(40),
    marginBottom: metrics.height(32),
  },
  inputContainer: {
    gap: metrics.height(16),
  },
  socialContainer: {
    marginTop: metrics.height(32),
    alignItems: 'center',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: metrics.width(24),
  },
  socialIcon: {
    width: metrics.width(48),
    height: metrics.width(48),
    borderRadius: metrics.width(24),
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

