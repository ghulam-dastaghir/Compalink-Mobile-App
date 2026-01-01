import { Fonts } from '@/assets/fonts';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function UpdatePasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveUpdate = useCallback(() => {
    if (!newPassword.trim()) {
      return;
    }
    if (!confirmPassword.trim()) {
      return;
    }
    if (newPassword !== confirmPassword) {
      // Show error - passwords don't match
      return;
    }
    console.log('Updating password...');
    // Navigate to next screen or show success
    // router.replace('/(main)');
  }, [newPassword, confirmPassword]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View style={styles.header}>
            <CustomText
              label="Update Password"
              fontSize={25}
              fontFamily={Fonts.Bold}
              color={Colors.black}
              marginBottom={metrics.height(8)}
            />
            <CustomText
              label="Update Your Password to set New Credentials"
              fontSize={12}
              fontFamily={Fonts.Regular}
              color={Colors.gray}
              lineHeight={20}
            />
          </View>

          <View style={styles.centeredContent}>
            {/* New Password Field */}
            <View style={styles.inputContainer}>
              <CustomText
                label="New Password"
                fontSize={13}
                fontFamily={Fonts.SemiBold}
                color={Colors.black}
                marginBottom={metrics.height(10)}
              />
              <CustomInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholderTextColor={Colors.gray}
                backgroundColor={'#FAFAFA'}
                borderColor={'#FAFAFA'}
                right={true}
              />
              <View style={styles.hintContainer}>
                <MaterialIcons name="info-outline" size={16} color={Colors.gray} />
                <CustomText
                  label="Should be atleast 8 characters long"
                  fontSize={12}
                  fontFamily={Fonts.Regular}
                  color={Colors.gray}
                  marginLeft={metrics.width(6)}
                />
              </View>
            </View>

            {/* Confirm New Password Field */}
            <View style={styles.inputContainer}>
              <CustomText
                label="Confirm New Password"
                fontSize={13}
                fontFamily={Fonts.SemiBold}
                color={Colors.black}
                marginBottom={metrics.height(10)}
              />
              <CustomInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor={Colors.gray}
                backgroundColor={'#FAFAFA'}
                borderColor={'#FAFAFA'}
                right={true}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        {/* Save Update Button - Fixed at Bottom */}
        <View style={styles.buttonContainer}>
          <CustomButton
            label="Save Update"
            onPress={handleSaveUpdate}
            backgroundColor={Colors.primary}
            borderRadius={12}
            fontSize={16}
            fontFamily={Fonts.Bold}
          />
        </View>
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
    paddingHorizontal: metrics.width(25),
    paddingTop: metrics.height(80),
    paddingBottom: metrics.height(150),
    minHeight: '100%',
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
    marginTop: metrics.height(20),
    marginBottom: metrics.height(40),
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: metrics.height(100),
  },
  inputContainer: {
    width: '100%',
    marginBottom: metrics.height(20),
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.height(8),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: metrics.width(25),
    paddingBottom: metrics.height(20),
    backgroundColor: Colors.white,
    paddingTop: metrics.height(10),
  },
});

