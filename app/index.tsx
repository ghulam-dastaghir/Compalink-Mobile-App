import React, { useEffect } from 'react';
import { router } from 'expo-router';
import SplashScreen from '@/screens/SplashScreen';

export default function SplashRoute() {
  useEffect(() => {
    // Show splash screen for 2-3 seconds, then navigate to auth
    const timer = setTimeout(() => {
      router.replace('/(main)');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <SplashScreen />;
}

