import { Dimensions, PixelRatio, Platform } from 'react-native';
import { metrics } from './metrics';

const { width, height } = Dimensions.get('window');

const widthDP = (number: any) => {
  const givenWidth = typeof number === 'number' ? number : parseFloat(number);
  const multiPly = givenWidth * 0.23;
  return PixelRatio.roundToNearestPixel((width * multiPly) / 100);
};

const heightDP = (number: any) => {
  const givenHeight = typeof number === 'number' ? number : parseFloat(number);
  const multiPly = givenHeight * 0.108;
  return PixelRatio.roundToNearestPixel((height * multiPly) / 100);
};

 const calculateGlobalWidth = (widthAndroid: string | number, widthIOS: string | number) => {
  return Platform.OS === 'android' ? metrics.width(widthAndroid) : metrics.width(widthIOS);
};

export { calculateGlobalWidth, heightDP, widthDP };

