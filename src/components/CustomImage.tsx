import { Image, ImageContentFit, ImageProps, ImageSource } from 'expo-image';
import React, { memo, useMemo } from 'react';
import { DimensionValue, ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { normalizeSize } from '../utils/normalize';

interface CustomImageProps extends Omit<ImageProps, 'source' | 'contentFit' | 'style' | 'resizeMode'> {
  source: number | { uri: string } | string | ImageSource | ImageSourcePropType;
  resizeMode?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: ViewStyle;
  priority?: 'low' | 'normal' | 'high';
  cache?: 'none' | 'disk' | 'memory' | 'memory-disk';
}

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  resizeMode = 'contain',
  width,
  height,
  borderRadius,
  style,
  containerStyle,
  priority = 'normal',
  cache = 'memory-disk',
  ...rest
}) => {
  const imageSource = useMemo(() => {
    if (typeof source === 'string') {
      return { uri: source };
    }
    if (typeof source === 'number') {
      return source;
    }
    return source;
  }, [source]);

  const contentFit = useMemo((): ImageContentFit => {
    const modeMap: Record<string, ImageContentFit> = {
      contain: 'contain',
      cover: 'cover',
      fill: 'fill',
      stretch: 'fill',
      center: 'contain',
      none: 'none',
      'scale-down': 'scale-down',
      scaleDown: 'scale-down',
    };
    return modeMap[resizeMode] || 'contain';
  }, [resizeMode]);

  const cachePolicy = useMemo(() => {
    const cacheMap: Record<string, 'none' | 'disk' | 'memory' | 'memory-disk'> = {
      none: 'none',
      web: 'disk',
      immutable: 'memory-disk',
      cacheOnly: 'disk',
    };
    return cacheMap[cache] || 'memory-disk';
  }, [cache]);

  const imageStyle = useMemo(() => {
    const baseStyle: ImageStyle = {};
    
    if (width !== undefined) {
      baseStyle.width = typeof width === 'number' ? normalizeSize(width) : width;
    }
    if (height !== undefined) {
      baseStyle.height = typeof height === 'number' ? normalizeSize(height) : height;
    }
    if (borderRadius !== undefined) {
      baseStyle.borderRadius = normalizeSize(borderRadius);
    }

    if (!style) {
      return baseStyle;
    }

    if (Array.isArray(style)) {
      return [baseStyle, ...style] as ImageStyle[];
    }
    
    return [baseStyle, style] as ImageStyle[];
  }, [width, height, borderRadius, style]);

  return (
    <Image
      source={imageSource}
      style={imageStyle}
      contentFit={contentFit}
      cachePolicy={cachePolicy}
      priority={priority}
      {...rest}
    />
  );
};

export default memo(CustomImage);
