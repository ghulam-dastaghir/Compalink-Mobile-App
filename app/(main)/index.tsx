import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/assets/fonts';

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <CustomText
          label="Welcome to Compalink"
          fontSize={24}
          fontFamily={Fonts.Bold}
          color={Colors.black}
          textAlign="center"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
