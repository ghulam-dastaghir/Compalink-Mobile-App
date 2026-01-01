import { StyleSheet } from 'react-native';
import { metrics } from '../utils/metrics';

export const useCustomInputStyle = () => {
  return StyleSheet.create({
    main: {
      width: '100%',
      marginBottom: metrics.height(15),
    },
  });
};

export const useCustomTextStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      // Container styles if needed
    },
  });
};

