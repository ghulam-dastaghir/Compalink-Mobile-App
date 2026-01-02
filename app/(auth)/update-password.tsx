import { Fonts } from '@/assets/fonts';
import CustomButton from '@/components/CustomButton';
import ControlledCustomInput from '@/components/ControlledCustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useUpdatePasswordForm, UpdatePasswordFormData } from '@/hooks/useAuthForm';

type PasswordField = {
  name: 'newPassword' | 'confirmPassword';
  label: string;
  placeholder: string;
  showHint?: boolean;
};

export default function UpdatePasswordScreen() {
  const {
    control,
    handleSubmit,
  } = useUpdatePasswordForm();

  const handleSaveUpdate = useCallback((data: UpdatePasswordFormData) => {
    console.log('Updating password...', data);
    // Navigate to next screen or show success
    // router.replace('/(main)');
  }, []);

  const passwordFields: PasswordField[] = useMemo(
    () => [
      {
        name: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter new password',
        showHint: true,
      },
      {
        name: 'confirmPassword',
        label: 'Confirm New Password',
        placeholder: 'Confirm new password',
        showHint: false,
      },
    ],
    []
  );

  const inputBackgroundColor = useMemo(() => '#FAFAFA', []);
  const iconSize = useMemo(() => 16, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
            {passwordFields.map((field) => (
              <View key={field.name} style={styles.inputContainer}>
                <CustomText
                  label={field.label}
                  fontSize={13}
                  fontFamily={Fonts.SemiBold}
                  color={Colors.black}
                  marginBottom={metrics.height(10)}
                />
                <ControlledCustomInput
                  control={control}
                  name={field.name}
                  placeholder={field.placeholder}
                  secureTextEntry
                  placeholderTextColor={Colors.gray}
                  backgroundColor={inputBackgroundColor}
                  borderColor={inputBackgroundColor}
                  right={true}
                />
                {field.showHint && (
                  <View style={styles.hintContainer}>
                    <MaterialIcons name="info-outline" size={iconSize} color={Colors.gray} />
                    <CustomText
                      label="Should be atleast 8 characters long"
                      fontSize={12}
                      fontFamily={Fonts.Regular}
                      color={Colors.gray}
                      marginLeft={metrics.width(6)}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        </KeyboardAwareScrollView>

        {/* Save Update Button - Fixed at Bottom */}
        <View style={styles.buttonContainer}>
          <CustomButton
            label="Save Update"
            onPress={handleSubmit(handleSaveUpdate)}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: metrics.width(25),
    paddingTop: metrics.height(80),
    paddingBottom: metrics.height(150),
  },
  header: {
    width: '100%',
    marginTop: metrics.height(20),
    marginBottom: metrics.height(40),
  },
  centeredContent: {
    width: '100%',
    marginTop: metrics.height(80),
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

