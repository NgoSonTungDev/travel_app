import {Dimensions} from 'react-native';

export const getDimensions = (
  type: 'screen' | 'window',
): {
  width: number;
  height: number;
} => {
  return {
    width: Dimensions.get(type).width,
    height: Dimensions.get(type).height,
  };
};

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
