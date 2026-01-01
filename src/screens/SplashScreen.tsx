import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/assets/fonts';
import { metrics } from '@/utils/metrics';
import CustomImage from '@/components/CustomImage';
import { IMAGES } from '@/assets/images';

const SplashScreen: React.FC = () => {
  const handleTermsPress = () => {
    Linking.openURL('https://compalink.com/terms').catch(err =>
      console.error('Failed to open Terms of Service:', err)
    );
  };
  const handlePrivacyPress = () => {
    Linking.openURL('https://compalink.com/privacy').catch(err =>
      console.error('Failed to open Privacy Policy:', err)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CustomImage 
          source={IMAGES.CompalinkIcon} 
          width={metrics.width(100)} 
          height={metrics.height(100)}
          resizeMode="contain"
        />
        </View>
        <CustomText
          label="CampaLink"
          fontSize={44}
          fontFamily={Fonts.SemiBold}
          color={Colors.white}
          textAlign="center"
          marginTop={metrics.height(20)}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleTermsPress}>
            <CustomText
              label="Terms of Service"
              fontSize={10}
              fontFamily={Fonts.Regular}
              color="#FFFFFFCC"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrivacyPress}>
            <CustomText
              label="Privacy Policy"
              fontSize={10}
              fontFamily={Fonts.Regular}
              color="#FFFFFFCC"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.width(20),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  footer: {
    position: 'absolute',
    bottom: metrics.height(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: metrics.width(15), 
  },
});

export default SplashScreen;

