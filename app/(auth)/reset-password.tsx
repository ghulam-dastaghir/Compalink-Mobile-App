import { Fonts } from '@/assets/fonts';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleReset = useCallback(() => {
    if (!emailOrPhone.trim()) {
      return;
    }
    console.log('Reset password for:', emailOrPhone);
  }, [emailOrPhone]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color={Colors.black} />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
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
              <CustomInput
                placeholder="+92 310 1314974"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                placeholderTextColor={Colors.gray}
                keyboardType="default"
                backgroundColor={'#FAFAFA'}
                borderColor={'#FAFAFA'}
              />
            </View>
            <CustomButton
              label="Reset"
              onPress={handleReset}
              backgroundColor={Colors.primary}
              borderRadius={12}
              fontSize={16}
              fontFamily={Fonts.Bold}
              marginTop={metrics.height(60)}
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

